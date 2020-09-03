import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { renameBoard } from '../../actions/board';
import { TextField } from '@material-ui/core';

const BoardTitle = ({ boardId, originalTitle }) => {
  const [title, setTitle] = useState(originalTitle);
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(renameBoard(boardId, { title }));
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <TextField required value={title} onChange={(e) => setTitle(e.target.value)} />
    </form>
  );
};

BoardTitle.propTypes = {
  boardId: PropTypes.string.isRequired,
  originalTitle: PropTypes.string.isRequired,
};

export default BoardTitle;