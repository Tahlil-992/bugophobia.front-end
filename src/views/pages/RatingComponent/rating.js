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

export default function StarRating({ editAllowed = false, onSubmit = false, setNewRate = () => ({}), val = 0 }) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (onSubmit) {
      setNewRate(value);
    }
  }, [onSubmit])


  return (
    <div className={classes.root}>
      <Rating
        name="rating-star"
        defaultValue={3.5}
        precision={editAllowed ? 1 : 0.1}
        readOnly={!editAllowed}
        value={editAllowed ? value : val}
        onChange={(event) => {setValue(event.target.value); setNewRate(event.target.value)}} />
    </div>
  );
}