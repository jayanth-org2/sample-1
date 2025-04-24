// longest from the sentence
// This function takes a string and returns the longest word in it
function longestWord(str) {
    // Split the string into words
    const words = str.split(' ');

    // Initialize a variable to hold the longest word
    let longest = '';

    // Loop through each word
    for (let i = 0; i < words.length; i++) {
        // If the current word is longer than the longest word found so far
        if (words[i].length > longest.length) {
            // Update the longest word
            longest = words[i];
        }
    }

    // Return the longest word found
    return longest;
}