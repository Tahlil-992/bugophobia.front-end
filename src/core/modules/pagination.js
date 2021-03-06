import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

export const Pagination = (
    {
        pageCount,
        page,
        onBackwardPage,
        onForwardPage,
        onForwardLastPage,
        onBackwardFirstPage
    }) => {
    return (
        <Box display="flex" flexDirection="row" justifyContent="center" alignItems={"center"}>
            <Box display="flex" padding={"0"} borderRadius="15px" flexDirection="row" justifyContent="center" alignItems={"center"} style={{backgroundColor: "#dddddd"}}>
                <IconButton disabled={page === 1} style={{padding: "0"}} onClick={onBackwardFirstPage}>
                    <FirstPageIcon fontSize="large"/>
                </IconButton>
                <IconButton disabled={page === 1} style={{padding: "0"}} onClick={onBackwardPage}>
                    <ChevronLeftIcon fontSize="large" />
                </IconButton>
                <IconButton disabled={page === pageCount} style={{padding: "0"}} onClick={onForwardPage}>
                    <ChevronRightIcon fontSize="large" />
                </IconButton>
                <IconButton disabled={page === pageCount} style={{padding: "0"}} onClick={onForwardLastPage}>
                    <LastPageIcon fontSize="large"/>
                </IconButton>
            </Box>
        </Box>
    )
}