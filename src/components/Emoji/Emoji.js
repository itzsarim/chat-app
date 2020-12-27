import React from 'react';
import styles from './Emoji.module.css';
import Grid from '@material-ui/core/Grid';

const emojis = ['😊', '😂', '😉', '😐',	'😑','😒','😓',	'😔','😕', '😖','😗','😘','😙','😚','😛','😜','😝','😞','😟'];

export function Emoji(prop) {
    return (
        <>
            <Grid container spacing={3} onClick={prop.handler}>
                {emojis.map((emoji) => {
                    return (
                        <Grid item xs={3}>
                            <span className={styles.emoji}>
                                {emoji}
                            </span>
                        </Grid>
                    )
                })}
            </Grid>
        </>
    );
}
