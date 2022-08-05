import React from 'react'
import {
    Box,
    Text,
    Button,
    Link,
    FormControl
} from '@chakra-ui/react'
import { request } from '../../hooks/apis'
import { InputBasic } from '../Inputs/InputBasic'
import { styles } from '../../config/styles'
import { useNavigate, useParams } from 'react-router-dom'
import { storage } from '../../hooks/storage'

export const CardLogin = () => {
    const [loginData, setLoginData] = React.useState({})
    const [loginError, setLoginError] = React.useState(false)
    // eslint-disable-next-line
    //const parameters = useParams()
    const navigate = useNavigate()

    const loginHandler = async () => {
        try {
            const response = await request.post("/users/login", loginData)
            setLoginError(false)
            const { token, message } = response.data
            console.log(message)
            storage.storeData("token", JSON.stringify(token))
            navigate(`/users/${1111}`)
        }
        catch (error) {
            console.log(error.response.status)
            setLoginError(true)
        }
    }

    React.useEffect(() => {
    }, [])

    return (
        <FormControl
            style={styles.cardsFlexColumn}
            background="white"
            maxWidth="30vw"
            minHeight="fit-content"
            borderRadius={15}
            padding={3}
            gap={3}
        >
            <Text
                style={styles.textTitles}
                fontSize="2xl"
            >
                Login
            </Text>
            <InputBasic
                placeholder="user@mail.com"
                label="Email"
                type="text"
                onChange={(event) => { setLoginData({ ...loginData, email: event.target.value }) }}
            />
            <InputBasic
                placeholder="123abc"
                label="Password"
                type="text"
                onChange={(event) => { setLoginData({ ...loginData, password: event.target.value }) }}
            />
            <Link
                alignSelf="flex-start"
                style={styles.link}
            >
                Forgot Password ?
            </Link>
            <Box
                style={styles.cardsFlexRow}
                width="fit-content"
                gap={3}
            >
                <Button
                    
                    fontSize="md"
                    onClick={loginHandler}
                >
                    Sign In
                </Button>
                <Link
                    style={styles.linkComponent}
                    href="/register"
                >
                    <Button
                        fontSize="md"
                    >
                        Create Account
                    </Button>
                </Link>
            </Box>
            {
                loginError
                    ? <Text color="#C21F1F" styles={styles.errorText}> Invalid Login, Try again.</Text>
                    : ''
            }
            <Box
                style={styles.cardsFlexColumn}
                minHeight="fit-content"
            >
                <Text
                    style={styles.textTitles}
                >
                    Or Enter With :
                </Text>
                <Box
                    style={styles.cardsFlexRow}
                    gap={3}
                >
                    <Box width="50px" height="50px" background="red" />
                    <Box width="50px" height="50px" background="blue" />
                </Box>
            </Box>
        </FormControl>
    )
}