import React, { useState } from 'react';
import { Grid, Slider, Box, TextField, Button, InputLabel, Select, MenuItem, FormControl } from '@mui/material';

function Form({ errorsCount, setErrorsCount, seed, setSeed, locale, setLocale }) {

    const [slider, setSlider] = useState(0);

    function handleSliderChange(event) {
        setSlider(event.target.value);
        setErrorsCount(event.target.value * 100);
    };

    function handleNumberChange(event) {
        if (event.target.value < 0) event.target.value = 0;
        if (event.target.value > 1000) event.target.value = 1000;
        setErrorsCount(event.target.value);
        setSlider(+event.target.value / 100);
    }

    function handleSeedChange(event) {
        setSeed(+event.target.value.replace(/[^+\d]/g, ''));
    }

    function handleRandomClick(event) {
        const newSeed = Math.floor(Math.random() * 1000);
        setSeed(newSeed);
    }

    function handleLocaleChange(event) {
        setLocale(event.target.value);
    }


    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={2}>
                <FormControl
                    sx={{ width: 100 }}
                >
                    <InputLabel id="locale-lable">Locale</InputLabel>
                    <Select
                        labelId="locale-lable"
                        id="locale-select"
                        value={locale}
                        label="locale"
                        onChange={handleLocaleChange}
                    >
                        <MenuItem value={'en'}>en_US</MenuItem>
                        <MenuItem value={'ru'}>ru_RU</MenuItem>
                        <MenuItem value={'hy'}>hy_AM</MenuItem>
                    </Select>
                </FormControl>
            </Grid>


            <Grid item xs={12} md={6}>
                <Slider
                    sx={{ maxWidth: 200, mx: 5 }}
                    value={slider}
                    min={0}
                    step={0.5}
                    max={10}
                    onChange={handleSliderChange}
                    aria-labelledby="non-linear-slider"
                />

                <TextField
                    sx={{ width: 90 }}
                    value={errorsCount}
                    onChange={handleNumberChange}
                    min={0}
                    max={1000}
                    type="number"
                    id="errors"
                    label="errors"
                />
            </Grid>


            <Grid item xs={12} md={4}>
                <TextField
                    sx={{ width: 90, mr: 1 }}
                    value={seed}
                    onChange={handleSeedChange}
                    min={0}
                    max={1000}
                    type="seed"
                    id="seed"
                    label="seed"
                />

                <Button
                    variant="contained"
                    onClick={handleRandomClick}
                >Random
                </Button>
            </Grid>
        </Grid>
    );
}

export default Form;