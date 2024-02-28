import React, { useState } from 'react';
import { Input } from 'antd';

function SearchItem({handleOnChange}){
  return <
    Input
    placeholder='search items'
    style={{height:"40px", maxWidth: "800px" }}
    onChange={(e) => handleOnChange(e)}
    />;
}

export default SearchItem;