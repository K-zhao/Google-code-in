# Setting up Python Data Analysis Tools

1. Installation of tools
    - [Matplotlib](https://github.com/K-zhao/Google-code-in/tree/master/Setting-Up-Data-Analysis-Python-Libraries#matplotlib)
    - [Jupyter](https://github.com/K-zhao/Google-code-in/tree/master/Setting-Up-Data-Analysis-Python-Libraries#jupyter)
    - [Pandas](https://github.com/K-zhao/Google-code-in/tree/master/Setting-Up-Data-Analysis-Python-Libraries#pandas)

## Matplotlib

### Installing Matplotlib

Matplotlib can be installed through pip, which is a package management system for python. It should be included by default for Python 2.7.9 and Python 3.4.

Use the following commands to install Matplotlib:

`python -m pip install -U pip`

`python -m pip install -U matplotlib`

Use `sudo` before the python commands if the installation complains about permission issues.

Like here:

![Terminal](https://github.com/K-zhao/Google-code-in/blob/master/Setting-Up-Data-Analysis-Python-Libraries/Terminal.png)

Make sure to install Tkinter as well. In Fedora, you can install it with the `sudo dnf install tkinter` command. You will need Tkinter to display the graph that you plotted.

### Running Matplotlib
You can use any of the examples on [Matplotlib's page,](https://matplotlib.org/gallery/index.html)
but for this guide I will be using [this exmaple. ](https://matplotlib.org/gallery/lines_bars_and_markers/psd_demo.html#sphx-glr-gallery-lines-bars-and-markers-psd-demo-py)The file for the source code can be found at the bottom of the page. Download the `.py` file, and run it through the Fedora Terminal, like so:

![Terminal2](https://github.com/K-zhao/Google-code-in/blob/master/Setting-Up-Data-Analysis-Python-Libraries/Terminal2.png)

You can also change the graph by zooming in and moving it around.

![Graphy](https://github.com/K-zhao/Google-code-in/blob/master/Setting-Up-Data-Analysis-Python-Libraries/Graphy.png)

Congratulations, you have successfully set up Matplotlib and can use it to display data sets in a nice visual format.

## Jupyter

### Installing Jupyter
Installing Jupyter is simple. You can use pip to install Jupyter as well with the following command in the terminal: `sudo pip install jupyter`

![Terminal3](https://github.com/K-zhao/Google-code-in/blob/master/Setting-Up-Data-Analysis-Python-Libraries/Terminal3.png)

### Running Jupyter

Use `jupyter notebook` in the terminal. You should get the following in the terminal, and a webpage should pop up.

![Terminal4](https://github.com/K-zhao/Google-code-in/blob/master/Setting-Up-Data-Analysis-Python-Libraries/Terminal4.png)
![Website](https://github.com/K-zhao/Google-code-in/blob/master/Setting-Up-Data-Analysis-Python-Libraries/Website.png)

This is the Notebook Dashboard. Download a `.ipynb` file. Examples can be found on [Matplotlib's website.](https://matplotlib.org/gallery/index.html)
If you scroll down to the bottom of the page for one of the examples, you can see that there is a `.ipynb` file beside the `.py` file. Download it, and run the file by finding it through the Dashboard, and clicking on the file. 

You should load the page with the code, but no graph. Click `Cell`, then `Run All` in the dropdown menu. A graph should pop up below like this:

![Website2](https://github.com/K-zhao/Google-code-in/blob/master/Setting-Up-Data-Analysis-Python-Libraries/Website2.png)

Congratulations, you have the Juypter Notebook set up.

## Pandas

### Installing Pandas

Installing Pandas can be achieved with pip.
Use `sudo pip3 install pandas` in the terminal.

![Terminal5](https://github.com/K-zhao/Google-code-in/blob/master/Setting-Up-Data-Analysis-Python-Libraries/Terminal5.png)

Issue commands `sudo pip3 install pandas_datareader` and `sudo dnf install python3-tkinter`. They are dependencies that need to be installed in order for the example code to run.

The example code is here, and can be copy pasted into a test.py file. Execute the file with python3 test.py through terminal.

```python
import datetime
import pandas_datareader.data as web
import matplotlib.pyplot as plt
from matplotlib import style

style.use('fivethirtyeight')

start = datetime.datetime(2010, 1, 1)
end = datetime.datetime.now()

df = web.DataReader("XOM", "morningstar", start, end)

df.reset_index(inplace=True)
df.set_index("Date", inplace=True)
df = df.drop("Symbol", axis=1)

print(df.head())

df['High'].plot()
plt.legend()
plt.show()
```

Congratulations, you have successfully installed Pandas. 