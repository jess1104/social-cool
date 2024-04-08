// Grid會自動分成16等份，要用width={num}去劃分等份
import { Grid } from 'semantic-ui-react'

import Topics from '../components/Topics'

function Post() {
    return <Grid>
        <Grid.Row>
            <Grid.Column width={3}><Topics /></Grid.Column>
            <Grid.Column width={10}>貼文列表</Grid.Column>
            <Grid.Column width={3}>空白</Grid.Column>
        </Grid.Row>
    </Grid>
}
export default Post