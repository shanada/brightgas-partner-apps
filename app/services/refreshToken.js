import React from 'react';
import { postService, timeoutService } from './serviceApi';
import { snackbarInfo } from '../modules/snackbarInfo';
// import console = require('console');

    async function refreshTokenPost (props) {
        await props.onRefreshToken(false)
        const { accessToken, refreshToken } = props
        const url = 'typeUrl'
        const body = {
            "access_token": accessToken,
            "refresh_token": refreshToken
        }
        console.log("token for request refresh => "+JSON.stringify(body))
        await postService(url, body).then(async(response) => {
            try {
                
                console.log("response from refresh token => "+JSON.stringify(response))
                let code = await response.code
                let data = await response.data
                if (code == 200) {
                    await props.onRefreshToken(true)
                    let accessToken = await data.token.access_token
                    let refreshToken = await data.token.refresh_token
                    await props.onSaveAccessToken(accessToken)
                    await props.onSaveRefreshToken(refreshToken)
                } else {
                    await props.onSetLoggedIn(false)
                    return snackbarInfo('Invalid access, please login again')
                }
            } catch (error) {
                console.log('error is '+error)
            }
        })
    }

export {refreshTokenPost}