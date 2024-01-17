/* eslint react-func/max-lines-per-function:0 */
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigation } from "@react-navigation/native"

/**
 * hook that is used to handle async requests with the fetch API
 * @returns everything that fetch API does
 */
export const useRequestHandler = () => {
    const { token, isAuthenticated, userLogout } = useAuthContext();
    const { navigate } = useNavigation();

    const handleRequest = async (
        method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
        authRequest: boolean,
        URL: string,
        bodyData?: object,
        headers?: Record<string, string>
    ) => {
        let buildRequest;
        const buildHeaders = !headers ? {} : headers;

        if (authRequest) {
            if (!token) {
                throw new Error('auth token is required in order to do auth requests');
            }

            buildHeaders["X-Authorization"] = token;

            try {
                if (method === 'GET') {
                    buildRequest = fetch(URL, { headers: { ...buildHeaders } });
                } else {
                    buildRequest = fetch(URL, {
                        method,
                        headers: !headers
                            ? {
                                ...buildHeaders,
                                'Content-Type': 'application/json'
                            }
                            : headers,
                        body: bodyData instanceof FormData ? bodyData : JSON.stringify(bodyData)
                    });
                }
            } catch (err) {
                console.error(err);
            }
        } else {
            if (method === 'GET') {
                buildRequest = fetch(URL);
            } else {
                buildRequest = fetch(URL, {
                    method,
                    headers: !headers ? { 'Content-Type': 'application/json' } : headers,
                    body: bodyData instanceof FormData ? bodyData : JSON.stringify(bodyData)
                });
            }
        }

        if (buildRequest) {
            const response = await buildRequest;
            const data = await response.json();

            if (response.ok) {
                return data;
            } else {
                const errorDetails = {
                    status: response.status,
                    message: data.error.message,
                    cause: data.error.cause
                }

                if (response.status === 403 && isAuthenticated) {
                    if (errorDetails.cause === 'Auth token') {
                        userLogout();
                        navigate('Login' as never);
                    }
                    throw errorDetails;
                }
                throw new Error(JSON.stringify(data));
            }
        }
    }

    const GET = handleRequest.bind({}, 'GET', false);
    const POST = handleRequest.bind({}, 'POST', false);
    const PATCH = handleRequest.bind({}, 'PATCH', false);
    const PUT = handleRequest.bind({}, 'PUT', false);
    const DELETE = handleRequest.bind({}, 'DELETE', false);

    const authGET = handleRequest.bind({}, 'GET', true);
    const authPOST = handleRequest.bind({}, 'POST', true);
    const authPATCH = handleRequest.bind({}, 'PATCH', true);
    const authPUT = handleRequest.bind({}, 'PUT', true);
    const authDELETE = handleRequest.bind({}, 'DELETE', true);

    return {
        GET,
        POST,
        PATCH,
        PUT,
        DELETE,
        authGET,
        authPOST,
        authPATCH,
        authPUT,
        authDELETE,
    }
}
