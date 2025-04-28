import { useNavigate, createSearchParams, useSearchParams } from 'react-router-dom';

export const useUrl = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const addToQuery = (key: string, val: string, push = true) => {
        let lastParam: { [key: string]: any } = {};

        searchParams.forEach((value, key) => {
            lastParam[key] = value;
        });
        let params = { ...lastParam };

        if (push) {
            searchParams.forEach((value, key) => {
                params[key] = value;
            });
            params[key] = val;
        } else {
            params[key] = val;
        }
        const options = {
            search: `?${createSearchParams(params)}`,
        };
        navigate(options, { replace: true });
    };

    const deleteFromQuery = (key: string) => {
        let lastParam: { [key: string]: any } = {};

        searchParams.forEach((value, key) => {
            lastParam[key] = value;
        });

        if (lastParam[key]) delete lastParam[key];

        const options = {
            search: `?${createSearchParams(lastParam)}`,
        };
        navigate(options, { replace: true });
    };

    const bulkAddToQuery = (obj: { [key: string]: any }, push = true) => {
        let params: { [key: string]: any } = {};
        let _obj: { [key: string]: any } = {};

        for (var key in obj) {
            if (obj.hasOwnProperty(key) && obj[key]) {
                _obj[key] = obj[key];
            }
        }

        if (push) {
            searchParams.forEach((value, key) => {
                params[key] = value;
            });

            params = { ...params, ..._obj };
        } else {
            params = { ..._obj };
        }
        const options = {
            search: `?${createSearchParams(params)}`,
        };
        navigate(options, { replace: true });
    };

    const deleteToQuery = ({ type = 'all', keyParam = '' }) => {
        //tyep == all | string | array
        let params: { [key: string]: any } = {};
        let _obj: { [key: string]: any } = {};

        switch (type) {
            case 'string':
                searchParams.forEach((value, key) => {
                    if (keyParam != key) {
                        params[key] = value;
                    }
                });
                break;
            case 'array':
                if (Array.isArray(keyParam)) {
                    searchParams.forEach((value, key) => {
                        console.log(key, keyParam, key in keyParam);
                        if (!keyParam.includes(key)) {
                            params[key] = value;
                        }
                    });
                }
                break;
            default:
                break;
        }
        params = { ...params, ..._obj };
        const options = {
            search: `?${createSearchParams(params)}`,
        };
        navigate(options, { replace: true });
    };

    return { addToQuery, bulkAddToQuery, deleteToQuery, deleteFromQuery };
};
