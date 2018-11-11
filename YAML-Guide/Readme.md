# YAML: A quick guide

## Tables of contents

1. [What is YAML?](https://github.com/K-zhao/Google-code-in/blob/master/YAML-Guide/Readme.md#what-is-yaml?)
2. [File Extension](https://github.com/K-zhao/Google-code-in/blob/master/YAML-Guide/Readme.md#file-extension)
3. [Basic Syntax](https://github.com/K-zhao/Google-code-in/blob/master/YAML-Guide/Readme.md#basic-syntax)
    - [Lists](https://github.com/K-zhao/Google-code-in/blob/master/YAML-Guide/Readme.md#lists)
    - [Dictionaries](https://github.com/K-zhao/Google-code-in/blob/master/YAML-Guide/Readme.md#dictionaries)
    - [Lists and Dictionaries](https://github.com/K-zhao/Google-code-in/blob/master/YAML-Guide/Readme.md#Lists-and-dictionaries)
    - [Variables](https://github.com/K-zhao/Google-code-in/blob/master/YAML-Guide/Readme.md#variables)
    - [Restricted Characters](https://github.com/K-zhao/Google-code-in/blob/master/YAML-Guide/Readme.md#restricted-characters)
4. [Other Notes](https://github.com/K-zhao/Google-code-in/blob/master/YAML-Guide/Readme.md#other-notes)
   - [Starting/ending YAML files](https://github.com/K-zhao/Google-code-in/blob/master/YAML-Guide/Readme.md#starting/ending-yaml-files)
   - [Comments](https://github.com/K-zhao/Google-code-in/blob/master/YAML-Guide/Readme.md#comments)

## What is YAML?

YAML stands for YAML ain't a markup language. It is similar to XML and JSON as they all are data storage formats. YAML's syntax is designed towards being readable by humans, and it can be used as a configuration file.

## File Extension

YAML files end with either `.yml` OR `.yaml` . It doesn't matter which one you pick.

## Basic Syntax

YAML stores data by associating data in key/value pairs. A colon separates the two types of data.

```yaml
Food: Fries
Book: Harry Potter
```

Values, or scalars, accept many data types including strings, booleans, numbers, lists, and dictionaries.

```yaml
Movie: "The Avengers"
Hungry: True
Age: 17
Countries: [Canada, Japan, India]
Cities: {Helsinki: Cold, Hawaii: Hot}
```

### Lists

Lists can be also be written down like this:

```yaml
foods:
    - chocolate
    - chips
    - spinach
```

Note the space after the dash. Also note that the indentation level remains consistent with the list. 

### Dictionaries

Dictionaries can also be written down like this:

```yaml
Canada:
    GDP: "1.653 Trillion Dollars"
    Population: "36 million"
    Climate: Cold
```

### Lists and Dictionaries

You can combine lists and dictionaries together as well :)

```yaml
Canada:
    GDP: "1.653 Trillion Dollars"
    Population: "36 million"
    Climate: Cold
    Industries:
        - Fishing
        - Forestry
        - Manufacturing
```

### Variables

Some 3rd party applications, such as Ansible, allow for variables.

```yaml
weather: "{{ depends }}"
```

Make sure to use double brackets, otherwise it will be interpreted as a dictionary.

You can then issue a value to the variable with the flag when issuing a command:

```bash
--extra-vars "weather: sunny"
```

which would insert the value into the variable.

### Restricted Characters

```yaml
[] {} > | * & ! % # ` @ ,
```

These characters cannot be used as the first character of an unquoted scalar, or value.

## Other Notes

### Starting/ending YAML files

YAML files can optionally begin with a `---` and optionally end with a `...`

### Comments

Comments can be used to help clarify code. You can use the `#` sign to comment out a single line of code. YAML does not support multi-line comments. Comments cannot be used inside of scalars, or values.

This is a correct way of commenting:

```yaml
key: #comment
  - value line 1
  #comment
  - value line 2
  #comment
  - value line 3
```