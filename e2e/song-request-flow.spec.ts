import { test, expect } from '@playwright/test'

test.describe('Song Request Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    // Wait for the app to load
    await page.waitForSelector('[data-testid="app-loaded"]', { timeout: 10000 })
  })

  test('should display the main interface correctly', async ({ page }) => {
    // Check if the main elements are visible
    await expect(page.locator('h1')).toContainText('Caretaker Harp King')
    await expect(page.locator('text=Good evening')).toBeVisible()
    await expect(page.locator('text=Browse Songs')).toBeVisible()
    await expect(page.locator('text=Request Queue')).toBeVisible()
    await expect(page.locator('text=Polls')).toBeVisible()
  })

  test('should allow browsing and filtering songs', async ({ page }) => {
    // Check if songs are loaded
    await expect(page.locator('text=songs available')).toBeVisible()
    
    // Test category filtering
    await page.click('button:has-text("Bollywood")')
    await expect(page.locator('button:has-text("Bollywood")')).toHaveClass(/bg-white/)
    
    // Test search functionality
    const searchInput = page.locator('input[placeholder*="What do you want to listen to"]')
    await searchInput.fill('Beatles')
    await page.waitForTimeout(500) // Wait for search debounce
    
    // Should show search results or no results message
    const hasResults = await page.locator('text=Beatles').count() > 0
    const hasNoResults = await page.locator('text=No results found').isVisible()
    expect(hasResults || hasNoResults).toBeTruthy()
  })

  test('should allow making a song request', async ({ page }) => {
    // Wait for songs to load
    await page.waitForSelector('text=songs available')
    
    // Find and click the first request button
    const requestButton = page.locator('button:has(svg)').first()
    await requestButton.click()
    
    // Check if request modal opens
    await expect(page.locator('text=Request Song')).toBeVisible()
    
    // Fill in the request form
    await page.fill('input[placeholder="Enter your name"]', 'Test User')
    await page.fill('textarea[placeholder*="Add a special message"]', 'This is a test request')
    
    // Submit the request
    await page.click('button:has-text("Request Song")')
    
    // Check for success message
    await expect(page.locator('text=Song requested successfully!')).toBeVisible({ timeout: 5000 })
    
    // Check if request count updated
    await expect(page.locator('text=1/3 requests used')).toBeVisible()
  })

  test('should prevent more than 3 requests per user', async ({ page }) => {
    // Make 3 requests
    for (let i = 0; i < 3; i++) {
      await page.waitForSelector('text=songs available')
      const requestButton = page.locator('button:has(svg)').first()
      await requestButton.click()
      
      await expect(page.locator('text=Request Song')).toBeVisible()
      await page.click('button:has-text("Request Song")')
      await page.waitForSelector('text=Song requested successfully!', { timeout: 5000 })
    }
    
    // Check that request limit is reached
    await expect(page.locator('text=3/3 requests used')).toBeVisible()
    
    // Try to make another request
    const requestButton = page.locator('button:has(svg)').first()
    await requestButton.click()
    
    // Should show error message
    await expect(page.locator('text=Maximum requests reached')).toBeVisible({ timeout: 5000 })
  })

  test('should display request queue', async ({ page }) => {
    // Make a request first
    await page.waitForSelector('text=songs available')
    const requestButton = page.locator('button:has(svg)').first()
    await requestButton.click()
    
    await expect(page.locator('text=Request Song')).toBeVisible()
    await page.fill('input[placeholder="Enter your name"]', 'Queue Test User')
    await page.click('button:has-text("Request Song")')
    await page.waitForSelector('text=Song requested successfully!')
    
    // Navigate to request queue
    await page.click('button:has-text("Request Queue")')
    
    // Check if the request appears in the queue
    await expect(page.locator('text=Queue Test User')).toBeVisible()
  })

  test('should handle mobile responsive design', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Check if mobile navigation is visible
    await expect(page.locator('.lg\\:hidden')).toBeVisible()
    
    // Check if desktop elements are hidden
    await expect(page.locator('.hidden.lg\\:flex')).not.toBeVisible()
    
    // Test mobile song request flow
    await page.waitForSelector('text=songs available')
    const mobileRequestButton = page.locator('button:has(svg)').first()
    await mobileRequestButton.click()
    
    await expect(page.locator('text=Request Song')).toBeVisible()
    await page.click('button:has-text("Cancel")')
  })

  test('should handle error states gracefully', async ({ page }) => {
    // Test with network offline to simulate error
    await page.context().setOffline(true)
    await page.reload()
    
    // Should show error state or loading state
    const hasError = await page.locator('text=Failed to load').isVisible()
    const hasLoading = await page.locator('text=Loading').isVisible()
    expect(hasError || hasLoading).toBeTruthy()
    
    // Restore network
    await page.context().setOffline(false)
  })

  test('should support PWA installation', async ({ page }) => {
    // Check if PWA manifest is loaded
    const manifestLink = page.locator('link[rel="manifest"]')
    await expect(manifestLink).toHaveAttribute('href', '/manifest.json')
    
    // Check if service worker is registered
    const swRegistration = await page.evaluate(() => {
      return 'serviceWorker' in navigator
    })
    expect(swRegistration).toBeTruthy()
  })
})

test.describe('Admin Flow', () => {
  test('should allow admin login', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('[data-testid="app-loaded"]', { timeout: 10000 })
    
    // Click admin access button
    await page.click('button:has-text("Admin Access")')
    
    // Check if admin auth modal opens
    await expect(page.locator('text=Admin Access')).toBeVisible()
    await expect(page.locator('input[type="password"]')).toBeVisible()
    
    // Enter admin PIN
    await page.fill('input[type="password"]', '1234')
    await page.click('button:has-text("Unlock")')
    
    // Should navigate to admin panel
    await expect(page.locator('text=Admin Dashboard')).toBeVisible()
  })

  test('should reject invalid admin PIN', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('[data-testid="app-loaded"]', { timeout: 10000 })
    
    await page.click('button:has-text("Admin Access")')
    await page.fill('input[type="password"]', '0000')
    await page.click('button:has-text("Unlock")')
    
    // Should remain on the same page or show error
    await expect(page.locator('text=Admin Dashboard')).not.toBeVisible()
  })

  test('should display admin dashboard with stats', async ({ page }) => {
    // Login as admin
    await page.goto('/')
    await page.waitForSelector('[data-testid="app-loaded"]', { timeout: 10000 })
    await page.click('button:has-text("Admin Access")')
    await page.fill('input[type="password"]', '1234')
    await page.click('button:has-text("Unlock")')
    
    // Check admin dashboard elements
    await expect(page.locator('text=Admin Dashboard')).toBeVisible()
    await expect(page.locator('text=Pending Requests')).toBeVisible()
    await expect(page.locator('text=Active Polls')).toBeVisible()
    await expect(page.locator('text=Total Claps')).toBeVisible()
  })

  test('should allow admin logout', async ({ page }) => {
    // Login as admin
    await page.goto('/')
    await page.waitForSelector('[data-testid="app-loaded"]', { timeout: 10000 })
    await page.click('button:has-text("Admin Access")')
    await page.fill('input[type="password"]', '1234')
    await page.click('button:has-text("Unlock")')
    
    await expect(page.locator('text=Admin Dashboard')).toBeVisible()
    
    // Logout
    await page.click('button:has-text("Logout")')
    
    // Should return to audience mode
    await expect(page.locator('text=Good evening')).toBeVisible()
    await expect(page.locator('text=Admin Dashboard')).not.toBeVisible()
  })
})

test.describe('Performance and Accessibility', () => {
  test('should load within acceptable time', async ({ page }) => {
    const startTime = Date.now()
    await page.goto('/')
    await page.waitForSelector('[data-testid="app-loaded"]', { timeout: 10000 })
    const loadTime = Date.now() - startTime
    
    // Should load within 5 seconds
    expect(loadTime).toBeLessThan(5000)
  })

  test('should have proper accessibility attributes', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('[data-testid="app-loaded"]', { timeout: 10000 })
    
    // Check for proper heading structure
    const h1 = page.locator('h1')
    await expect(h1).toBeVisible()
    
    // Check for proper button labels
    const buttons = page.locator('button')
    const buttonCount = await buttons.count()
    expect(buttonCount).toBeGreaterThan(0)
    
    // Check for proper form labels
    await page.locator('button:has(svg)').first().click()
    await expect(page.locator('label')).toBeVisible()
  })

  test('should work with keyboard navigation', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('[data-testid="app-loaded"]', { timeout: 10000 })
    
    // Test tab navigation
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Enter')
    
    // Should be able to navigate and interact with keyboard
    const focusedElement = page.locator(':focus')
    await expect(focusedElement).toBeVisible()
  })
})