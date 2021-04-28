import React, { useEffect, useState } from 'react';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
  },
}));

export default function StarRating({ editAllowed = false, onSubmit = false }) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (onSubmit)
    {
      alert(value);
    }
  }, [onSubmit])


  return (
    <div className={classes.root}>
      <Rating 
        name="rating-star"
        defaultValue={3.5} 
        precision={0.1} 
        readOnly={!editAllowed} 
        value={value}
        onChange={(event) => setValue(event.target.value)}/>
    </div>
  );
}