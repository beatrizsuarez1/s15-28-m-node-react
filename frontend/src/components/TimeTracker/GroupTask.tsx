import { Box, Divider, Grid, IconButton, List, ListItem, ListItemText, Typography, styled } from "@mui/material"
import PlayCircleIcon from '@mui/icons-material/PlayCircle';


// function generate(element: React.ReactElement) {
//     return [0, 1, 2].map((value) =>
//         React.cloneElement(element, {
//             key: value,
//         }),
//     );
// }

const Demo = styled('div')(() => ({
    backgroundColor: '#f3f4f6',
}));

interface GroupTypes {
    status: 'ABIERTO' | 'EN PROCESO' | 'PRUEBA' | 'COMPLETADO',
}

const GroupTask = ({ status }: GroupTypes) => {

    const color = () => {
        if (status === 'ABIERTO') return '#6b7280'
        if (status === 'EN PROCESO') return '#f97316'
        if (status === 'PRUEBA') return '#0ea5e9'
        if (status === 'COMPLETADO') return '#3b82f6'
    }

    return (
        <Box borderRadius={2} bgcolor={color} boxShadow={1} width='80vw'>
            <Grid xs={12} md={6}>
                <Typography sx={{ mt: 4, mb: 2, textAlign: 'center' }} variant="h6" component="div" color='white'>
                    {status}
                </Typography>
                <Demo>
                    <List>
                        <ListItem
                            secondaryAction={
                                <IconButton edge="end" aria-label="Iniciar">
                                    <PlayCircleIcon />
                                </IconButton>

                            }
                        >

                            <ListItemText
                                primary="Task Project"
                            />
                            <ListItemText
                                primary="00:00:00"
                            />

                        </ListItem>
                        <Divider />
                        <ListItem
                            secondaryAction={
                                <IconButton edge="end" aria-label="Iniciar">
                                    <PlayCircleIcon />
                                </IconButton>

                            }
                        >

                            <ListItemText
                                primary="Task Project"
                            />
                            <ListItemText
                                primary="00:00:00"
                            />

                        </ListItem>
                        <Divider />
                        <ListItem
                            secondaryAction={
                                <IconButton edge="end" aria-label="Iniciar">
                                    <PlayCircleIcon />
                                </IconButton>

                            }
                        >

                            <ListItemText
                                primary="Task Project"
                            />
                            <ListItemText
                                primary="00:00:00"
                            />

                        </ListItem>

                    </List>
                </Demo>
            </Grid>
        </Box>

    )
}
export default GroupTask





{/* <List>
                        {generate(
                            <ListItem
                                secondaryAction={
                                    <IconButton edge="end" aria-label="Iniciar">
                                        <PlayCircleIcon />
                                    </IconButton>
                                    
                                }
                            >

                                <ListItemText
                                    primary="Task Project"
                                />
                                 <ListItemText
                                    primary="00:00:00"
                                />
                               
                            </ListItem>,
                            
                        )}
                    </List> */}