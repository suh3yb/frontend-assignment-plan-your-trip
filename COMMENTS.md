Please answer these questions once you have finished the assignment.

**What did you think of the assignment?**

I like the assignment because it is a very strait to the point for a front-end role.  
The project is already created using CRA and it comes with a backend API in place.  
There is even a Figma file for design so that candidates can focus on implementing pixel perfect UI and improving UX.  
I like that there are role related challenges such as filtering functionality and lazy loading.

**Which part did you consider the most difficult, or did you spend most of your time on?**

I think I spent the most of time on implementing lazy-loading. It is still not as nice as I wanted.  
Other than that, I spent some time on an alternative `select` implementation for country and city selections.  
Since it is not really possible to style dropdown options using HTML `select` element, it would  
be nice to have a custom implementation to improve UX. In the end, I decided not to do that for this  
assignment because of time constraints.  
Figuring out how to implement tests for UI was also time consuming but I value testing so it was worth it.

**Which parts were you not able to fully implement?**

- Custom `select` element
- Click and drag functionality for dates
- Fixing flash/jump of spinner & product cards when date changes
- Full responsiveness across different viewports

**What would you add or improve if you had more time?**

- Data caching, especially for products of already selected filter combinations
- More tests especially for hooks
- Better error handling in case of network/backend issues
- Improve lazy loading
- Introduce React-Context instead of passing `setState` to child element
- Change the small animation of dates so that it happens only once, not with every city selection
- Find another way to set selected date other that attaching `onChange` to each element
- Update npm packages, with current ones there are lots of vulnerabilities

**What would you do differently if it was a bigger application?**

- Change project structure, especially components folder
- Try to find a good scalable CSS method
- Add helpful comments to code that is difficult to understand (better documentation)
- Get reviews & feedback from others
