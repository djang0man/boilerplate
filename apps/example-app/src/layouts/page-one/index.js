// libs
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "@material-ui/core/Button";

// material-ui
import { makeStyles } from "@material-ui/core/styles";

// actions
import { ExampleAppActions } from "@boilerplate/example-app/state/actions";

// components
import { Container, Item } from "@boilerplate/shared/components";

// helpers
import { buildAction } from "@boilerplate/shared/util";

// selectors
import {
  selectExampleAppCat,
  selectExampleAppCats,
} from "@boilerplate/example-app/state/selectors";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 400,
    fontFamily: "Arial",
  },
  main: {
    padding: "1.25em",
    background: "#EEE",
  },
  container: {
    margin: "0 0 1.25em",
  },
  img: {
    width: "100%",
    marginBottom: ".5em",
  },
  stat: {
    marginBottom: ".5em",
  },
}));

const PageOne = (props) => {
  const {} = props;

  const classes = useStyles();
  const dispatch = useDispatch();

  const [cat, setCat] = useState({});
  const [cats, setCats] = useState([]);
  const [currentCat, setCurrentCat] = useState(0);

  const apiCat = useSelector(selectExampleAppCat);
  const apiCats = useSelector(selectExampleAppCats);

  const fetchCat = () => {
    dispatch(buildAction(ExampleAppActions.FETCH_EXAMPLE));
  };

  const getCat = () => {
    fetchCat();
    setCurrentCat(currentCat + 1);
  };

  useEffect(() => {
    fetchCat();
  }, []);

  useEffect(() => {
    if (cat !== apiCat) {
      setCat(apiCat);
    }
  }, [apiCat]);

  useEffect(() => {
    if (cats !== apiCats) {
      setCats(apiCats);
    }
  }, [apiCats]);

  const prevCatDisabled = currentCat === 0;
  const nextCatDisabled = currentCat === cats.length - 1;

  const getPrevCat = () => {
    setCurrentCat(currentCat - 1);
  };

  const getNextCat = () => {
    setCurrentCat(currentCat + 1);
  };

  return (
    <>
      <Container alignItems="center" className={classes.root}>
        <Item xs="auto">
          {cats?.length > 0 && cats[currentCat] && (
            <>
              <Container
                justify="center"
                className={`${classes.main} ${classes.container}`}
              >
                <Item>
                  {<img className={classes.img} src={cats[currentCat].url} />}
                </Item>
                <Item>
                  <Container className={classes.container}>
                    <Item className={classes.stat} xs={12}>
                      Breed: {cats[currentCat].breeds[0].name}
                    </Item>
                    <Item className={classes.stat} xs={12}>
                      Life Span: {cats[currentCat].breeds[0].life_span}
                    </Item>
                    <Item className={classes.stat} xs={12}>
                      URL:
                      <a
                        href={cats[currentCat].breeds[0].wikipedia_url}
                        target="_blank"
                      >
                        {cats[currentCat].breeds[0].wikipedia_url}
                      </a>
                    </Item>
                  </Container>
                  <Container justify={"flex-end"}>
                    <Item>
                      <Button
                        color={"secondary"}
                        variant={"outlined"}
                        onClick={() => getCat()}
                      >
                        Get Cat
                      </Button>
                    </Item>
                  </Container>
                </Item>
              </Container>
              <Container
                className={classes.container}
                justify={"space-between"}
              >
                <Item>
                  <Button
                    color={"secondary"}
                    variant={"outlined"}
                    disabled={prevCatDisabled}
                    onClick={() => getPrevCat()}
                  >
                    Get Prev
                  </Button>
                </Item>
                <Item>
                  <Button
                    color={"secondary"}
                    variant={"outlined"}
                    disabled={nextCatDisabled}
                    onClick={() => getNextCat()}
                  >
                    Get Next
                  </Button>
                </Item>
              </Container>
            </>
          )}
        </Item>
      </Container>
    </>
  );
};

export default PageOne;
