import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Grid,
} from "@mui/material";

export default function MuiPage() {
  return (
    <Box>
      <Grid container rowSpacing={1} columnSpacing={{xs:1, sm:2, md:3}}>
        <Grid item xs={12} lg={4}>
          <Box sx={{ backgroundColor: "red" }}>1</Box>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Box sx={{ backgroundColor: "blue" }}>2</Box>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Box sx={{ backgroundColor: "green" }}>3</Box>
        </Grid>
        <Grid item xs={12} lg={4} >
          <Box sx={{ backgroundColor: "yellow" }}>4</Box>
        </Grid>
      </Grid>
    </Box>
  );
}
