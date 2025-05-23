import { Container, Typography, Paper, Divider, Box, List, ListItem, ListItemText, Link } from '@mui/material';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import CircleIcon from '@mui/icons-material/Circle';

const About = () => {
    return (
        <Container maxWidth="md">
            <Paper 
                elevation={2}
                sx={{ 
                    p: { xs: 3, sm: 4 }, 
                    mt: 2, 
                    mb: 4,
                    borderRadius: 2 
                }}
            >
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h2" gutterBottom>
                        About
                    </Typography>
                    <Divider sx={{ mb: 3 }} />
                </Box>

                <Typography variant="body1" paragraph>
                    Often, the biggest challenge in running a race is finding the time to train. Having a good training plan is key, but understanding how your running life intersects your non-running life is even more important. After all, you're not likely to kill that Sunday long run if it follows that Saturday night Phish show. Your training needs to work despite travel you do, work deadlines you face, kid schedules, doctor's appointments, election days, Maker Faire, visits from out-of-town friends, baseball games, dates, gran fondos, colonoscopies, court appearances—whatever life throws at you is easier to manage when it's on a calendar.
                </Typography>

                <Typography variant="body1" paragraph>
                    Each time I gear up for a race, I search Google for a way to marry a training plan to my calendar and I'm surprised when nothing comes up. Instead, I do what you probably do: I enter each training run by hand. It's a colossal waste of time and an easy way to add or remove a few miles with a careless fat finger.
                </Typography>

                <Typography variant="body1" paragraph>
                    So to save myself this mundane ritual as I lock in a training schedule for the 2016 Boston Marathon (and many evenings and weekends since), I hacked together a web application that lets me:
                </Typography>

                <List sx={{ ml: 4, mb: 2 }} component="ol">
                    <ListItem sx={{ display: 'list-item' }}>
                        <ListItemText primary="Choose the date of my goal race" />
                    </ListItem>
                    <ListItem sx={{ display: 'list-item' }}>
                        <ListItemText primary="Choose a training plan" />
                    </ListItem>
                    <ListItem sx={{ display: 'list-item' }}>
                        <ListItemText primary="Specify miles or km (Hello non-Americans!)" />
                    </ListItem>
                    <ListItem sx={{ display: 'list-item' }}>
                        <ListItemText primary="Download an iCalendar (.ics) file with the right training runs on it" />
                    </ListItem>
                </List>

                <Typography variant="body1" paragraph>
                    If you're not familiar with <Link href="https://en.wikipedia.org/wiki/ICalendar" target="_blank" rel="noopener">iCalendar</Link> files, what you need to know is that you can import them into Google Calendar, the OSX Calendar app, and any other calendar app worth using.
                </Typography>

                <Typography variant="body1" paragraph>
                    (If you do use Google Calendar, I recommend creating a new calendar to import into so your training schedule gets its own color and so you can show/hide it as needed.)
                </Typography>

                <Typography variant="body1" paragraph>
                    The app knows about some training plans:
                </Typography>

                <List sx={{ ml: 4, mb: 2 }} component="ul">
                    <ListItem sx={{ display: 'list-item' }}>
                        <ListItemText 
                            primary={
                                <>
                                    Several plans by Pete Pfitzinger and Scott Douglas from their popular <Link href="http://www.amazon.com/Advanced-Marathoning-Edition-Pete-Pfitzinger/dp/0736074600" target="_blank" rel="noopener">Advanced Marathoning</Link> book
                                </>
                            } 
                        />
                    </ListItem>
                    <ListItem sx={{ display: 'list-item' }}>
                        <ListItemText 
                            primary={
                                <>
                                    Several plans by Pete Pfitzinger and Philip Latter from their popular <Link href="https://www.amazon.com/Faster-Road-Racing-Half-Marathon/dp/1450470459" target="_blank" rel="noopener">Faster Road Racing: 5K to Half Marathon</Link> book
                                </>
                            } 
                        />
                    </ListItem>
                    <ListItem sx={{ display: 'list-item' }}>
                        <ListItemText 
                            primary={
                                <>
                                    Beginner and Advanced Marathon plans by Keith and Kevin Hanson from their popular <Link href="https://www.amazon.com/Hansons-Marathon-Method-Your-Fastest/dp/1937715485" target="_blank" rel="noopener">Hansons Marathon Method</Link> book
                                </>
                            } 
                        />
                    </ListItem>
                    <ListItem sx={{ display: 'list-item' }}>
                        <ListItemText 
                            primary={
                                <>
                                    Several plans by Hal Higdon from his popular <Link href="http://www.amazon.com/Marathon-Ultimate-Training-Programs-Marathons/dp/1609612248" target="_blank" rel="noopener">Marathon: The Ultimate Training Guide</Link> book
                                </>
                            } 
                        />
                    </ListItem>
                    <ListItem sx={{ display: 'list-item' }}>
                        <ListItemText primary="A few popular \"Couch to 5K\" plans for new runners" />
                    </ListItem>
                </List>

                <Typography variant="body1" paragraph>
                    I've read these books and have trained with programs from them in the past. The plans will make little sense if you don't take the time to read the books they came from. So, seriously, understand what you're getting yourself into so you get the most out of your training and don't hurt yourself.
                </Typography>

                <Typography variant="body1" paragraph>
                    The scope of this app is intentionally narrow—it helps get a stock training plan onto your calendar with as little friction as possible. Once it's on your calendar, by all means adjust the scheduled runs as necessary so your running life doesn't wreck your non-running life and vice-versa.
                </Typography>

                <Typography variant="body1" paragraph>
                    That being said, you can make some minor changes to the plan before you download it:
                </Typography>

                <List sx={{ ml: 4, mb: 2 }} component="ol">
                    <ListItem sx={{ display: 'list-item' }}>
                        <ListItemText primary="Swap any two workouts easily using drag-and-drop: just grab the workout you want to move and drag it where you want it to go." />
                    </ListItem>
                    <ListItem sx={{ display: 'list-item' }}>
                        <ListItemText primary="Swap all workouts that fall on a given day of the week with workouts on another day of the week: just grab the day of week heading (e.g. \"Sunday\") and drop it onto the day you would like to swap with (e.g. \"Saturday\")." />
                    </ListItem>
                    <ListItem sx={{ display: 'list-item' }}>
                        <ListItemText primary="An undo button will appear near the top of the screen if you need it." />
                    </ListItem>
                </List>

                <Typography variant="body1" paragraph>
                    Note: These features work best on bigger screens; day-of-week swapping is not currently available on devices with smallest screens.
                </Typography>

                <Typography variant="body1" paragraph>
                    Thanks for reading this far. If you find any bugs, have any questions or feedback feel free to get in touch (contact details appear below).
                </Typography>
            </Paper>
        </Container>
    );
};

export default About;