import {Box, FormControl, FormHelperText,
    Grid, InputAdornment, InputLabel, Select,
    TextField
} from "@mui/material";
import Container from "@mui/material/Container";
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useValidator from "../../../utils/useValidator";
import * as Yup from 'yup';
import {useNavigate} from "react-router";
import CustomDatePicker from "../../../Components/CustomDatePicker";
import React, {useEffect, useState} from "react";
import { categories, sources } from '../../../constant/newsApiConstant';
import {getNewsAPIArticles} from "../../../stores/NewsApi/actions";
import {useDispatch} from "react-redux";

function Searchbar({page}) {

    const pageSize = 12;
    const dispatch = useDispatch();
    const onSubmit = () => {
        searchArticles();
    }
    const searchArticles = () => {
        let url = `source=${encodeURIComponent(values?.source)}&keyword=${encodeURIComponent(values?.keyword)}&category=${encodeURIComponent(values?.category ?? '')}&pageSize=${pageSize}&page=${page}`;
        if (values?.dateFrom && values?.dateTo) {
            let date1 = new Date(values.dateFrom)
            let dateFrom = date1.getFullYear() + '-' + (date1.getMonth() + 1) + '-' + date1.getDate()

            let date2 = new Date(values.dateTo)
            let dateTo = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + date2.getDate()
            url += `&fromDate=${dateFrom}&toDate=${dateTo}`;
        }
        dispatch(getNewsAPIArticles(url));
    }

    const {
        values,
        setValues,
        touched,
        errors,
        handleSubmit,
    } = useValidator({
        initialValues: {
            keyword: '',
            source: '',
            dateFrom: '',
            dateTo: '',
            category: '',
        },
        validationSchema: Yup.object().shape({
            keyword: Yup.string().required('Please write keyword'),
            source: Yup.string().required('Select Source.'),
        }),
        onSubmit,
    });

    useEffect(() => {
        if(page && values?.source && values?.keyword){
            searchArticles();
        }
    }, [page]);

    return (
        <>
            <Container sx={{my: 2}}>
                <Box sx={{flexGrow: 1, px: 5,py:3}} className="primary-bg">
                    <Grid item sm={12} sx={{pb: 1}}>
                        <Typography className="primary-color" component="h2" variant="h4">
                            Search article
                        </Typography>
                    </Grid>
                    <form noValidate onSubmit={handleSubmit} >
                        <Grid container spacing={2}>

                            <Grid item xs={12} sm={12}>
                                <TextField
                                    fullWidth
                                    placeholder="Enter query for search "
                                    value={values.keyword}
                                    onChange={(e) => setValues({...values, keyword: e.target.value})}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon/>
                                            </InputAdornment>
                                        ),
                                    }}
                                    variant="outlined"
                                    required
                                />
                                {touched?.keyword && errors?.keyword ? (
                                    <FormHelperText error>{errors?.keyword}</FormHelperText>
                                ) : (
                                    ''
                                )}
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Source</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Select Source"
                                        value={values.source}
                                        onChange={(e) => setValues({...values, source: e.target.value})}
                                    >
                                        {sources?.map((source) => (
                                            <MenuItem value={source.key} key={source.key}>{source.value}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                {touched?.source && errors?.source ? (
                                    <FormHelperText error>{errors?.source}</FormHelperText>
                                ) : (
                                    ''
                                )}
                            </Grid>
                              <Grid item xs={12} sm={12}>
                              <Typography component="h6"  sx={{ fontSize: 13,position:'relative',top:'40%' }}>
                                     Below are optional for search:
                                </Typography>
                              </Grid>
                            <Grid item xs={6} sm={6}>
                                <CustomDatePicker
                                    onChange={(newValue) => {
                                        setValues({...values, dateFrom: newValue});
                                    }}
                                    dateLabel="Date from"

                                />
                            </Grid>
                            <Grid item xs={6} sm={6}>
                                <CustomDatePicker
                                    onChange={(newValue) => {
                                        setValues({...values, dateTo: newValue});
                                    }}
                                    dateLabel="Date to"
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                     
                                <FormControl fullWidth>
                                    <InputLabel id="category-label">Category</InputLabel>
                                    <Select
                                        labelId="category-label"
                                        id="category-label"
                                        label="Select Category"
                                        value={values.category}
                                        onChange={(e) => setValues({...values, category: e.target.value})}
                                    >
                                        {categories?.map((category) => (
                                            <MenuItem value={category} key={category}>{category}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Button  color="primary" type="submit" variant="outlined" size="large"  sx={{color:"var(--primary)",borderColor:"var(--primary)",py: 2}}
                                        fullWidth>Search</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Container>
        </>
    )
}

export default Searchbar;