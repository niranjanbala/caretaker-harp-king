import { render, screen } from '@testing-library/react'
import LoadingSpinner, { SongItemSkeleton, SongListSkeleton, ErrorState } from '../LoadingSpinner'

describe('LoadingSpinner', () => {
  it('renders with default props', () => {
    render(<LoadingSpinner />)
    
    const spinner = screen.getByRole('status', { hidden: true })
    expect(spinner).toBeInTheDocument()
  })

  it('renders with custom text', () => {
    const testText = 'Loading songs...'
    render(<LoadingSpinner text={testText} />)
    
    expect(screen.getByText(testText)).toBeInTheDocument()
  })

  it('renders with different sizes', () => {
    const { rerender } = render(<LoadingSpinner size="sm" />)
    let spinner = screen.getByRole('status', { hidden: true }).firstChild
    expect(spinner).toHaveClass('w-4', 'h-4')

    rerender(<LoadingSpinner size="lg" />)
    spinner = screen.getByRole('status', { hidden: true }).firstChild
    expect(spinner).toHaveClass('w-8', 'h-8')
  })

  it('applies custom className', () => {
    const customClass = 'my-custom-class'
    render(<LoadingSpinner className={customClass} />)
    
    const container = screen.getByRole('status')
    expect(container).toHaveClass(customClass)
  })
})

describe('SongItemSkeleton', () => {
  it('renders skeleton for mobile layout', () => {
    render(<SongItemSkeleton />)
    
    // Check for mobile layout elements
    const mobileContainer = document.querySelector('.lg\\:hidden')
    expect(mobileContainer).toBeInTheDocument()
  })

  it('renders skeleton for desktop layout', () => {
    render(<SongItemSkeleton />)
    
    // Check for desktop layout elements
    const desktopContainer = document.querySelector('.hidden.lg\\:contents')
    expect(desktopContainer).toBeInTheDocument()
  })

  it('has proper skeleton styling', () => {
    render(<SongItemSkeleton />)
    
    const skeletonElements = document.querySelectorAll('.bg-gray-700, .bg-gray-800')
    expect(skeletonElements.length).toBeGreaterThan(0)
  })
})

describe('SongListSkeleton', () => {
  it('renders table header for desktop', () => {
    render(<SongListSkeleton />)
    
    const tableHeader = document.querySelector('.hidden.lg\\:grid')
    expect(tableHeader).toBeInTheDocument()
  })

  it('renders multiple skeleton items', () => {
    render(<SongListSkeleton />)
    
    // Should render 8 skeleton items by default
    const skeletonItems = document.querySelectorAll('.divide-y > *')
    expect(skeletonItems).toHaveLength(8)
  })

  it('has proper container styling', () => {
    render(<SongListSkeleton />)
    
    const container = document.querySelector('.bg-gray-900\\/50')
    expect(container).toBeInTheDocument()
    expect(container).toHaveClass('rounded-lg', 'overflow-hidden')
  })
})

describe('ErrorState', () => {
  it('renders with default props', () => {
    render(<ErrorState />)
    
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    expect(screen.getByText('Please try again later')).toBeInTheDocument()
  })

  it('renders with custom title and message', () => {
    const customTitle = 'Custom Error Title'
    const customMessage = 'Custom error message'
    
    render(<ErrorState title={customTitle} message={customMessage} />)
    
    expect(screen.getByText(customTitle)).toBeInTheDocument()
    expect(screen.getByText(customMessage)).toBeInTheDocument()
  })

  it('renders retry button when onRetry is provided', () => {
    const mockRetry = jest.fn()
    render(<ErrorState onRetry={mockRetry} />)
    
    const retryButton = screen.getByRole('button', { name: /try again/i })
    expect(retryButton).toBeInTheDocument()
  })

  it('does not render retry button when onRetry is not provided', () => {
    render(<ErrorState />)
    
    const retryButton = screen.queryByRole('button', { name: /try again/i })
    expect(retryButton).not.toBeInTheDocument()
  })

  it('calls onRetry when retry button is clicked', () => {
    const mockRetry = jest.fn()
    render(<ErrorState onRetry={mockRetry} />)
    
    const retryButton = screen.getByRole('button', { name: /try again/i })
    retryButton.click()
    
    expect(mockRetry).toHaveBeenCalledTimes(1)
  })

  it('applies custom className', () => {
    const customClass = 'custom-error-class'
    render(<ErrorState className={customClass} />)
    
    const container = screen.getByText('Something went wrong').closest('div')
    expect(container).toHaveClass(customClass)
  })

  it('has proper error icon styling', () => {
    render(<ErrorState />)
    
    const iconContainer = document.querySelector('.bg-red-600\\/20')
    expect(iconContainer).toBeInTheDocument()
    expect(iconContainer).toHaveClass('rounded-full', 'flex', 'items-center', 'justify-center')
  })
})