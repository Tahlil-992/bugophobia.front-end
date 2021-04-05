import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

export function LoadingSpinner() {
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box marginRight="1em"><CircularProgress /></Box>
            <Box><Typography variant="body1">Loading ... </Typography></Box>
        </Box>
    );
}