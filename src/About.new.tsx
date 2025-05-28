
const About = () => {
    return (
        <div className="container mx-auto max-w-3xl">
            <div className="bg-white shadow-md p-3 sm:p-4 mt-2 mb-4 rounded-lg">
                <div className="mb-3">
                    <h2 className="text-3xl font-bold mb-2">
                        About
                    </h2>
                    <hr className="mb-3 border-gray-200" />
                </div>

                <p className="mb-4">
                    Often, the biggest challenge in running a race is finding the time to train. Having a good training plan is key, but understanding how your running life intersects your non-running life is even more important. After all, you're not likely to kill that Sunday long run if it follows that Saturday night Phish show. Your training needs to work despite travel you do, work deadlines you face, kid schedules, doctor's appointments, election days, Maker Faire, visits from out-of-town friends, baseball games, dates, gran fondos, colonoscopies, court appearances—whatever life throws at you is easier to manage when it's on a calendar.
                </p>

                <p className="mb-4">
                    Each time I gear up for a race, I search Google for a way to marry a training plan to my calendar and I'm surprised when nothing comes up. Instead, I do what you probably do: I enter each training run by hand. It's a colossal waste of time and an easy way to add or remove a few miles with a careless fat finger.
                </p>

                <p className="mb-4">
                    So to save myself this mundane ritual as I lock in a training schedule for the 2016 Boston Marathon (and many evenings and weekends since), I hacked together a web application that lets me:
                </p>

                <ol className="list-decimal ml-4 mb-4">
                    <li className="mb-1">
                        Choose the date of my goal race
                    </li>
                    <li className="mb-1">
                        Choose a training plan
                    </li>
                    <li className="mb-1">
                        Specify miles or km (Hello non-Americans!)
                    </li>
                    <li className="mb-1">
                        Download an iCalendar (.ics) file with the right training runs on it
                    </li>
                </ol>

                <p className="mb-4">
                    If you're not familiar with <a href="https://en.wikipedia.org/wiki/ICalendar" target="_blank" rel="noopener" className="text-blue-600 hover:text-blue-800 underline">iCalendar</a> files, what you need to know is that you can import them into Google Calendar, the OSX Calendar app, and any other calendar app worth using.
                </p>

                <p className="mb-4">
                    (If you do use Google Calendar, I recommend creating a new calendar to import into so your training schedule gets its own color and so you can show/hide it as needed.)
                </p>

                <p className="mb-4">
                    The app knows about some training plans:
                </p>

                <ul className="list-disc ml-4 mb-4">
                    <li className="mb-2">
                        Several plans by Pete Pfitzinger and Scott Douglas from their popular <a href="http://www.amazon.com/Advanced-Marathoning-Edition-Pete-Pfitzinger/dp/0736074600" target="_blank" rel="noopener" className="text-blue-600 hover:text-blue-800 underline">Advanced Marathoning</a> book
                    </li>
                    <li className="mb-2">
                        Several plans by Pete Pfitzinger and Philip Latter from their popular <a href="https://www.amazon.com/Faster-Road-Racing-Half-Marathon/dp/1450470459" target="_blank" rel="noopener" className="text-blue-600 hover:text-blue-800 underline">Faster Road Racing: 5K to Half Marathon</a> book
                    </li>
                    <li className="mb-2">
                        Beginner and Advanced Marathon plans by Keith and Kevin Hanson from their popular <a href="https://www.amazon.com/Hansons-Marathon-Method-Your-Fastest/dp/1937715485" target="_blank" rel="noopener" className="text-blue-600 hover:text-blue-800 underline">Hansons Marathon Method</a> book
                    </li>
                    <li className="mb-2">
                        Several plans by Hal Higdon from his popular <a href="http://www.amazon.com/Marathon-Ultimate-Training-Programs-Marathons/dp/1609612248" target="_blank" rel="noopener" className="text-blue-600 hover:text-blue-800 underline">Marathon: The Ultimate Training Guide</a> book
                    </li>
                    <li className="mb-2">
                        A few popular "Couch to 5K" plans for new runners
                    </li>
                </ul>

                <p className="mb-4">
                    I've read these books and have trained with programs from them in the past. The plans will make little sense if you don't take the time to read the books they came from. So, seriously, understand what you're getting yourself into so you get the most out of your training and don't hurt yourself.
                </p>

                <p className="mb-4">
                    The scope of this app is intentionally narrow—it helps get a stock training plan onto your calendar with as little friction as possible. Once it's on your calendar, by all means adjust the scheduled runs as necessary so your running life doesn't wreck your non-running life and vice-versa.
                </p>

                <p className="mb-4">
                    That being said, you can make some minor changes to the plan before you download it:
                </p>

                <ol className="list-decimal ml-4 mb-4">
                    <li className="mb-1">
                        Swap any two workouts easily using drag-and-drop: just grab the workout you want to move and drag it where you want it to go.
                    </li>
                    <li className="mb-1">
                        Swap all workouts that fall on a given day of the week with workouts on another day of the week: just grab the day of week heading (e.g. "Sunday") and drop it onto the day you would like to swap with (e.g. "Saturday").
                    </li>
                    <li className="mb-1">
                        An undo button will appear near the top of the screen if you need it.
                    </li>
                </ol>

                <p className="mb-4">
                    Note: These features work best on bigger screens; day-of-week swapping is not currently available on devices with smallest screens.
                </p>

                <p className="mb-4">
                    Thanks for reading this far. If you find any bugs, have any questions or feedback feel free to get in touch (contact details appear below).
                </p>
            </div>
        </div>
    );
};

export default About;
