import { Box, Container, Grid, Link } from '@material-ui/core'
import React from 'react'

const Footer = () => {
    return (
        <footer>
            <Box
                px={{ xs: 3, sm: 5 }}
                py={{ xs: 5, sm: 10 }}
                bgcolor='text.secondary'
                color='white'
            >
                <Container maxWidth='lg'>
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={4}>
                            <Box borderBottom={1}>Help</Box>
                            <Box>
                                <Link href='/my-experience#contactus' color='inherit'>
                                    Contact
                                </Link>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </footer>
    )
}

export default Footer
