import os.path
from setuptools import setup


_here = os.path.abspath(os.path.dirname(__file__))
with open(os.path.join(_here, 'README.md'), encoding='utf-8') as f:
    long_description = f.read()


setup(
    name='shopant-sdk',
    version='0.0.2',
    description='ShopAnt SDK',
    long_description=long_description,
    long_description_content_type='text/markdown',
    url='https://github.com/anyant/shopant-sdk',
    author='guyskk',
    author_email='guyskk@qq.com',
    classifiers=[
        'Development Status :: 3 - Alpha',
        'Intended Audience :: Developers',
        'Topic :: Software Development :: Build Tools',
        'License :: OSI Approved :: MIT License',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.5',
        'Programming Language :: Python :: 3.6',
        'Programming Language :: Python :: 3.7',
        'Programming Language :: Python :: 3.8',
        'Programming Language :: Python :: 3 :: Only',
    ],
    packages=['shopant_sdk'],
    python_requires='>=3.5',
    install_requires=['requests', 'pyjwt'],
    extras_require={
        'dev': ['pytest'],
    },
)
