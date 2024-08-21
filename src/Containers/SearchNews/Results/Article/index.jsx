import {Card, CardActions, CardContent, CardMedia, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LazyLoad from 'react-lazyload';
import moment from "moment";

function Article({article, index}) {
    const defaultImg = process.env.PUBLIC_URL+"/empty.jpg"
    return (
        <Card key={article?.index}  sx={{height:"100%"}}>
            <LazyLoad height={200}>
                <CardMedia
                    component="img"
                    alt={article?.title}
                    height="140"
                    loading="lazy"
                    image={article.image_url || defaultImg}
                />
            </LazyLoad>
            <CardContent>
                <Typography gutterBottom variant="h5"
                            component="h5" sx={{color:"var(--primary)", height:{sm:"80px", xs:"60px"}}}>
                    {article?.title.substring(0, 50)}
                </Typography>
                <Grid>
                    <small>{article?.author_name}</small> | <small>{moment(article?.publish_date).format('DD MMMM, YYYY')}</small>
                </Grid>
                <Typography variant="body2" color="text.secondary">
                    {article?.description.length > 100 ?
                        article?.description.substring(0, 100) + "..."
                        :
                        article?.description
                    }
                </Typography>
            </CardContent>
            <CardActions>
                <Button href={article?.url} target="_blank" size="small">Read More</Button>
            </CardActions>
        </Card>
    )
}

export default Article;