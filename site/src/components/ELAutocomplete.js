import React from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles(theme => ({
    autoComplete: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
      }
  }));

  
export default function ELAutocomplete({value, options, onChange, objDescription, allowAddNewElement = () => false}) {
    const filter = createFilterOptions();
    const classes = useStyles();
    const objDescriptionLower = objDescription.toLowerCase()
    const id = objDescription.replace(" ")

    return (
        <Autocomplete
        id={id}
        key={"autocomplete_" + id}
        className={classes.autoComplete}
        options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
        groupBy={option => option.firstLetter}
        value={value}
        freeSolo
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          if (allowAddNewElement() && params.inputValue !== '' && !options.map(x => x.title).includes(params.inputValue)) {
            filtered.push({
              inputValue: params.inputValue,
              title: `Create new "${objDescriptionLower}" "${params.inputValue}"`,
              key: params.inputValue,
              firstLetter: ''
            });
          }
          return filtered;
        }}
        getOptionLabel={(option) => {
          // e.g value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return `Create new ${objDescriptionLower} ${option.inputValue}`
          }
          return option.title;
        }}
        onChange={onChange}
        renderInput={params => (
          <TextField {...params} label={objDescription} key={id + "_autocompleteTextField"} variant="outlined" fullWidth
            helperText={value != null ? "Selected " + objDescriptionLower + ": " + value['title'] : ""} />
        )}
      />)
}
