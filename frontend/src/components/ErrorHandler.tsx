interface ErrorHandlerProps {
    errorMessage: string
    isError: boolean
}

/**
 * This is a component that essentially transforms errors that occured in other parts of the application into errors sent from the DOM elements.
 * This is because errors from async operations and UseEffect callbacks are not caught by the error boundary, so we have to transform them somehow.
 * To use this method, the "errorMessage" and "isError" parameters are set in the page where the error handler runs and it picks them up like a try catch clause.
 * @returns an empty DOM component
 */
export const ErrorHandler = ({ errorMessage, isError }: ErrorHandlerProps) => {
    if (isError) {
        throw new Error(errorMessage)
    }
    return <></>
}
