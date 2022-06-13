import Grid from "@mui/material/Grid";
import useScrollTop from "./hooks/useScrollTop";


export function Home() {
    useScrollTop();

    return (
        <div className="container my-10">
          <Grid container spacing={3}>
            {FEATURE_LIST.map((box, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <FeatureBox
                  imgUrl={box.imgUrl}
                  title={box.title}
                  to={box.to}
                  subTitle={box.subTitle}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      );
}