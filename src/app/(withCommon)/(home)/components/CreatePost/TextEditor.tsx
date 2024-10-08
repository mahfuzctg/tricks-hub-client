'use client'
import { Editor } from '@tinymce/tinymce-react';


type TProps = {
  description? : string,
  setLatestDescription : React.Dispatch<React.SetStateAction<string>>,
}

const TextEditor = ({ description ='', setLatestDescription}: TProps) => {

    const handleEditorChange = (content : string) => {
      setLatestDescription(content);
      };


    return (
        <div className="w-full">
        <Editor
          apiKey="kx095fty1tawpi69r5z7ybvqumq4k1vvockmxubycrsjawks" 
          initialValue={`<p>${description || 'Description here...'}</p>`}
          init={{
            height: 190,
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount'
            ],
            toolbar:
              'undo redo | formatselect | bold italic backcolor | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist outdent indent | removeformat'
          }}
          
          onEditorChange={handleEditorChange}


          
        />
      </div>
    );
};

export default TextEditor;