import axios from "axios";
import { setItemToAsync, getItemFromAsync, removeItemFromAsync } from './storage';

const CRACKERS_API_URL = process.env.EXPO_PUBLIC_API_URL;

export class Request {
    constructor() {
    }
    default = async (path, body) => {
        const accessToken = await getItemFromAsync('accessToken');
        const refreshToken = await getItemFromAsync('refreshToken');

        const url = CRACKERS_API_URL + path;

        let headerValue;

        if (accessToken === null || accessToken === undefined || accessToken === false) {
            headerValue = `No Auth`;
        } else {
            headerValue = `Bearer ${accessToken}`;
        }

        try {
            const response = await body(url, headerValue);
            return response;
        } catch (err) {
            console.log(err.response);
            if (err.response == undefined) {
                // 백엔드와 통신 자체가 실패(ERR_CONNECTION_REFUSED)
                console.log(err);
                alert("ERR_CONNECTION_REFUSED" + CRACKERS_API_URL);
                console.warn(CRACKERS_API_URL);
                throw err;
            }
            else if (
                err.response.status == 401
            ) {
                // access      토큰이 만료된 경우 또는 로그인이 필요한 기능의 경우
                //만료된 토큰 : "Given token not valid for any token type"
                //없는 토큰 : "자격 인증데이터(authentication credentials)가 제공되지 않았습니다."
                removeItemFromAsync('accessToken'); //기존 access token 삭제
                //refresh 토큰을 통해 access 토큰 재발급
                try {
                    const response = await axios.post(
                        CRACKERS_API_URL + "/accounts/token/refresh",
                        {
                            refreshToken: refreshToken,
                        },
                        {
                            headers: {
                                Authorization: "No Auth",
                            },
                        }
                    );
                    setItemToAsync('accessToken', response.data.accessToken);
                    console.warn("new access token", response.data.accessToken)
                    headerValue = `Bearer ${response.data.accessToken}`;
                } catch (err) {
                    // refresh 토큰이 유효하지 않은 모든 경우(토큰 만료, 토큰 없음 등)
                    console.error(err);
                    return;
                }
                console.log("==============");
                // 새로운 access 토큰으로 API 요청 재수행
                const response = await body(url, headerValue);
                return response;

            } else {
                // 백엔드와 통신 자체는 성공, status code가 정상 값 범위 외
                console.log(err);
                // throw err;
                return err.response;

            }
        }
    }
    get = async (path, params, headers) => {
        return await this.default(path, async (url, headerValue) => {
            const response = await axios.get(
                url,
                {
                    params: params,

                    headers: {
                        Authorization: headerValue,
                        ...headers,
                    },
                }
            );
            console.log("request test => ", response);
            return response;
        });
    }

    post = async (path, data, headers) => {
        return await this.default(path, async (url, headerValue) => {
            const response = await axios.post(
                url,
                data,
                {
                    headers: {
                        Authorization: headerValue,
                        ...headers,
                    },
                }
            );
            console.log("headers", {
                Authorization: headerValue,
                ...headers,
            });
            console.log("request test => ", response);
            return response;
        });
    }

    put = async (path, data, headers) => {
        return await this.default(path, async (url, headerValue) => {
            const response = await axios.put(
                url,
                data,
                {
                    headers: {
                        Authorization: headerValue,
                        ...headers,
                    },
                }
            );
            console.log("request test => ", response);
            return response;
        });
    }

    delete = async (path, params, headers) => {
        return await this.default(path, async (url, headerValue) => {
            const response = await axios.delete(
                url,
                {
                    params: params,

                    headers: {
                        Authorization: headerValue,
                        ...headers,
                    },
                }
            );
            console.log("request test => ", response);
            return response;
        });
    }

    patch = async (path, data, headers) => {
        return await this.default(path, async (url, headerValue) => {
            const response = await axios.patch(
                url,
                data,
                {
                    headers: {
                        Authorization: headerValue,
                        ...headers,
                    },
                }
            );
            console.log("request test => ", response);
            return response;
        });
    }
}
