import regex as re

# Define a string to search
text = "The quick brown fox jumps over the lazy dog"

# Define a regular expression pattern to match
pattern = r"\b\w{4}\b"

# Use re.findall() to find all matches of the pattern in the text
matches = re.findall(pattern, text)

# Print the matches
print(matches)