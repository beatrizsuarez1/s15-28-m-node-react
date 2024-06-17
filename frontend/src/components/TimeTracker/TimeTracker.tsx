import { Divider, Stack, Button, Box } from "@mui/material"
import Tracker from "./Tracker"
import { MonetizationOn, AccessTime } from "@mui/icons-material"

import GroupTask from "./GroupTask"

const TimeTracker = () => {
  return (
    <>
      <section className=" bg-slate-100">
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          marginTop={5}
          padding={2}
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
        >
          <Tracker />
          <MonetizationOn />
          <div>
            <p>02:19:00</p>
          </div>
          <Button
            variant="outlined"
            startIcon={<AccessTime />}
            sx={{ backgroundColor: '#eff6ff' }}
          >
            Iniciar
          </Button>
        </Stack>
      </section>
      <Box 
        marginTop={10} 
        
        >
        <Stack
          justifyContent="center"
          alignItems="center"
          direction={{ sm: 'column', md: 'row' }}
          spacing={{ sm: 4, md: 8}}
        >
          <GroupTask status='ABIERTO'/>
          <GroupTask status='EN PROCESO'/>
          <GroupTask status='PRUEBA'/>
          <GroupTask status='COMPLETADO'/>
        </Stack>
      </Box>



    </>
  )
}
export default TimeTracker