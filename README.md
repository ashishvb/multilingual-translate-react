# Multilingual Translate for React.js
Add multilingual support to your react app with 4 easy steps. Built with React hooks and love.

### Example
[View](http://ashishvb.github.io/example-multilingual-translate-react)  [Code](https://github.com/ashishvb/example-multilingual-translate-react)


### Installation
npm i multilingual-translate --save

### Usage
1. Create a separate JSON file for every required language and store them inside public/translations in your react project.  
for eg 
- english translations in public/translations/en.json
- hindi translations in public/translations/hin.json   

2. Wrap the root component with the MultiLingualTranslationWrapper component. Index.js or App.js is the best place for this to share the translations all over the app.
```
    import MultiLingualTranslationWrapper from 'multilingual-translate';
    ReactDOM.render(
        <MultiLingualTranslationWrapper defLang="en" folderURL={process.env.PUBLIC_URL + '/translations'}>
          <App />
        </MultiLingualTranslationWrapper>
      document.getElementById('root')
    );
```

3. Use the Translate function from the useTranslate hook to get translation from the json file
```
    import { useTranslate  } from 'multilingual-translate';
    
    function App() {
    
      let [translate] = useTranslate();
    
      return (
        <div>
           { translate('homepage.title') } 
        </div>
      );
    }
    export default App;
```

4. Change the language/translate with the ChangeLanguage function with the translation file name as the argument from  useTranslate hook

```
import { useTranslate  } from 'multilingual-translate';

function App() {

  let [translate, changeLanguage] = useTranslate();

  return (
    <div >
       { translate('homepage.title') }  <br/>

      <button onClick={() => changeLanguage('hin')}> Translate To Hindi </button>
      <button onClick={() => changeLanguage('en')}> Translate To English </button>
    </div>
  );
}

export default App;
```



