/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh 
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test is to make sure that url has been defined in 
         * all objects in allFeed variable and that it is not empty.
         */
        it('has url', function() {
            allFeeds.forEach(function(e) {
                const url = e.url
                expect(url).toBeDefined();
                expect(url.length).not.toBe(0);
            });
        });


        /* This test is to make sure that name has been defined in 
         * all objects in allFeed variable and that it is not empty.
         */
        it('has name', function() {
            allFeeds.forEach(function(e) {
                const name = e.name
                expect(name).toBeDefined();
                expect(name.length).not.toBe(0);
            });
        });
    });


    /* This suite is all about menu function and its visibility
     */
    describe('The menu', function() {

        function checkHiddenStatus() {
            return $('body').hasClass('menu-hidden')
        } 

        /* This test is to make sure that the menu element is
         * hidden by default.
         */
        it('is hidden by default', function() {
            expect(checkHiddenStatus()).toBe(true);
        });


        /* This test is to make sure that the menu changes
         * visibility when the menu icon is clicked. 
         */
        it('changes visibility when the menu icon is clicked', function() {
            const menuIcon = $('.menu-icon-link');
            let expectValue = false

            /* This loop is used to make menuIcon got clicked twice to make sure 
             * that it will toggle between show and hidden.
             */
            for(let i = 0; i < 2; i++){
                menuIcon.click();
                expect(checkHiddenStatus()).toBe(expectValue);
                expectValue = !expectValue;
            }
        });
    });


    /* This suite is all about making sure that feed entry has always been loaded.
     */
    describe('Initial Entries', function() { 

        /* This function is to make sure that loadFeed function has completed its work 
         * before starting each test.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                done()
            }) 
        });

        /* This test is to make sure that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        it('should have at least one .entry element in .feed container', function(done) {
            const entries = $('.feed .entry')
            expect(entries.length).not.toBe(0);
            done()
        });
    });


    /* This suite is all about making sure that feeds will be changed according to menu selection.
     */
    describe('New Feed Selection', function() { 
        
        /* This function is to store entries that have been loaded each time and 
         * make it able to compare with each other.
         */
        let firstFeed
        let secondFeed
        beforeAll(function(done) { 
            loadFeed(0, function() {
                firstFeed = $('.feed').children().text()
                loadFeed(1, function() {
                    secondFeed = $('.feed').children().text()
                    done();
                })
            })
        })

        /* This test is to make sure that when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        it('should not be the same as previous', function(done) {
            console.log(firstFeed)
            console.log(secondFeed)
            expect(firstFeed).not.toBe(secondFeed);
            done();
        });

        afterAll(function(done) { 
            loadFeed(0)
            done()
        })
    })
}());
