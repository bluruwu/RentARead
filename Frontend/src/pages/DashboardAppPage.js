import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography} from '@mui/material';
// components
// sections
import {
  AppCurrentVisits,
  AppWebsiteVisits,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

import MapView from './MapView';
// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title> Estadísticas | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Estadísticas
        </Typography>


        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Clientes Activos" total={215000} icon={'mdi:users-group'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Operadores" total={1265} color="info" icon={'ri:customer-service-2-fill'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Ingresos por mes" total={880000000} color="success" icon={'material-symbols:attach-money'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="clientes en mora" total={85000} color="error" icon={'ic:baseline-warning-amber'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Visitas al sitio web"
              subheader="(+43%) que el año pasado"
              chartLabels={[
                '01/01/2021',
                '02/01/2021',
                '03/01/2021',
                '04/01/2021',
                '05/01/2021',
                '06/01/2021',
                '07/01/2021',
                '08/01/2021',
                '09/01/2021',
                '10/01/2021',
                '11/01/2021',
              ]}
              chartData={[
                {
                  name: 'Visitas',
                  type: 'column',
                  fill: 'solid',
                  data: [445, 368, 562, 288, 315, 489, 520, 476, 394, 413, 467],
                },
            /*    {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                }, */
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Clientes por municipio"
              chartData={[
                { label: 'Cali', value: 125000 },
                { label: 'Yumbo', value: 15000 },
                { label: 'Jamundí', value: 40000 },
                { label: 'Palmira', value: 20000 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={12}>
            <AppConversionRates
              title="Cliente nuevos por mes"
              subheader="(+43%) que el año pasado"
              chartData={[
                { label: 'Enero', value: 400 },
                { label: 'Febrero', value: 430 },
                { label: 'Marzo', value: 448 },
                { label: 'Abril', value: 470 },
                { label: 'Mayo', value: 540 },
                { label: 'Junio', value: 580 },
                { label: 'Julio', value: 690 },
                { label: 'Agosto', value: 715 },
                { label: 'Septiembre', value: 780 },
                { label: 'Octubre', value: 825 },
                { label: 'Noviembre', value: 850 },
                { label: 'Diciembre', value: 890 },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={12}>
            <MapView/>
          </Grid>
         
        </Grid>
      </Container>
    </>
  );
}
