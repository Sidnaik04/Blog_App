import React from 'react'
import {Editor} from '@tinymce/tinymce-react'
import {Controller} from 'react-hook-form'

export default function RTE({name, control, label, defaultValue=""}) {
  return (
    <div className='w-full'> 
        {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

        <Controller
            name={name || "content"}
            control={control}
            render={({field: {onChange}})=>(
                <Editor
                    apiKey='10k1popua0gqy5513uk93ideudustwtzg3ihq3mmrqk1kuol'
                    initialValue={defaultValue}
                    init={{
                        initialValue:defaultValue,
                        height:500,
                        menubar:true,
                        plugins:[
                            "image",
                            "advlist",
                            "autolink",
                            "lists",
                            "link",
                            "image",
                            "charmap",
                            "preview",
                            "anchor",
                            "searchreplace",
                            "visualblocks",
                            "code",
                            "fullscreen",
                            "insertdatetime",
                            "media",
                            "table",
                            "code",
                            "help",
                            "wordcount",
                            "anchor",
                        ],
                        toolbar:
                            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                        content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                    }}

                    onEditorChange={onChange}
                />
            )}
        />
    </div>
  )
}



//RTE -> real time editor (using tinymce)

/*
1. Import Editor from tinymce 
2. Import Controller from react-hook-form which is use to provide reference to Editor
3. Inputs of RTE -> name, control (from Controller), label, defaultValue (empty string)
4. <Controller/> => 
    a.name from input or "content"
    b. control -> reference 
    c. render -> rendering will take place if field changes (onChange)
5. <Editor/> =>
    a. init (editor) -> initialValue, height, menubar, plugins, toolbar and style of content

6. onEditorChange -> based on onChange -> rendering will take place 
*/