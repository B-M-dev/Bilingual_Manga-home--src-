export function getSession(request) {
    return {
        userAgent: request.headers['user-agent']
    }
}


