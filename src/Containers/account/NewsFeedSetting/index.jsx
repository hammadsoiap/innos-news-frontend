import { Helmet, HelmetProvider } from "react-helmet-async";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {
    Card,
    CardContent,
    FormControl, FormHelperText,
    Grid,
    InputLabel, Select,
} from "@mui/material";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { categories, authors, sources } from '../../../constant/newsApiConstant';
import { useDispatch, useSelector } from "react-redux";
import { userPreference, userPreferenceSave } from "../../../stores/Auth/actions";
import useValidator from "../../../utils/useValidator";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import Loader from "../../../Components/Loader";

function NewsFeedSetting() {
    const {
        isPreferenceUpdating,
        userPreferenceData,
        userPreferenceError,
        user,
    } = useSelector(state => state?.AuthReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            dispatch(userPreference());
        }
    }, [user]);

    const onSubmit = () => {
        const formData = new FormData();
        formData.append('source', values.source);
        formData.append('category', values.category);
        formData.append('author', values.author);
        setError('');
        dispatch(userPreferenceSave(formData));
    };

    const {
        values,
        setValues,
        errors,
        handleSubmit,
        touched
    } = useValidator({
        initialValues: {
            source: "",
            category: "",
            author: "",
        },
        validationSchema: Yup.object({
            source: Yup.string().required('Source is required'),
            category: Yup.string().required('Category is required'),
            author: Yup.string().required('Author is required'),
        }),
        onSubmit,
    });

    useEffect(() => {
        if (userPreferenceData) {
            setValues({
                source: userPreferenceData.source || "",
                category: userPreferenceData.category || "",
                author: userPreferenceData.author || "",
            });
        }
    }, [userPreferenceData]);

    const [error, setError] = useState('');

    useEffect(() => {
        if (typeof userPreferenceError === 'object' && userPreferenceError != undefined) {
            setError(Object.values(userPreferenceError).join(", "));
        }
    }, [userPreferenceError]);

    return (
        <HelmetProvider>
            <Helmet>
                <title>Preference</title>
            </Helmet>
            <Container
                maxWidth="sm"
                sx={{
                    py: '60px'
                }}
            >
                <Card sx={{ pt: 3, pb: 2, px: 4 ,background:"var(--primary-back)"}}>
                    <CardContent>
                        <Typography variant="h4" mb={5}>
                            News Feed Setting
                        </Typography>
                        <form noValidate onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} mb={3}>
                                    <FormControl fullWidth>
                                        <InputLabel id="sourceauthor-label">Source</InputLabel>
                                        <Select
                                            labelId="sourceauthor-label"
                                            id="sourceauthor"
                                            label="Select Source"
                                            value={values.source || ""}
                                            onChange={(e) => setValues({ ...values, source: e.target.value })}
                                        >
                                            {sources?.map((source) => (
                                                <MenuItem value={source.key} key={source.key}>{source.value}</MenuItem>
                                            ))}
                                        </Select>
                                        {touched?.source && errors?.source ? (
                                            <FormHelperText error>{errors?.source}</FormHelperText>
                                        ) : (
                                            ''
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} mb={3}>
                                    <FormControl fullWidth>
                                        <InputLabel id="category-label">Category</InputLabel>
                                        <Select
                                            labelId="category-label"
                                            id="category"
                                            label="Select Source"
                                            value={values.category || ""}
                                            onChange={(e) => setValues({ ...values, category: e.target.value })}
                                        >
                                            {categories?.map((category) => (
                                                <MenuItem value={category} key={category}>{category}</MenuItem>
                                            ))}
                                        </Select>
                                        {touched?.category && errors?.category ? (
                                            <FormHelperText error>{errors?.category}</FormHelperText>
                                        ) : (
                                            ''
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} mb={3}>
                                    <FormControl fullWidth>
                                        <InputLabel id="author-label">Authors</InputLabel>
                                        <Select
                                            labelId="author-label"
                                            id="author"
                                            label="Select Source"
                                            value={values.author || ""}
                                            onChange={(e) => setValues({ ...values, author: e.target.value })}
                                        >
                                            {authors?.map((author) => (
                                                <MenuItem value={author} key={author}>{author}</MenuItem>
                                            ))}
                                        </Select>
                                        {touched?.author && errors?.author ? (
                                            <FormHelperText error>{errors?.author}</FormHelperText>
                                        ) : (
                                            ''
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} mb={3}>
                                    {isPreferenceUpdating ?
                                        <Button disabled fullWidth size='large' color="warning" variant="contained">
                                            <Loader />
                                        </Button>
                                        :
                                        <Button type="submit" fullWidth size='large' sx={{color:"var(--primary)",borderColor:"var(--primary)"}} variant="outlined">
                                            Save Preference
                                        </Button>
                                    }
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </HelmetProvider>
    );
}

export default NewsFeedSetting;
