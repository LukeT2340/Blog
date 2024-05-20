import React, { useState, useEffect } from 'react';
import { usePost } from '../hooks/usePost';
import 'prismjs/themes/prism-okaidia.css';
import 'prismjs/components/prism-swift';
import Prism from 'prismjs';
import { stylesTemplate, contentTemplate } from './newBlogTemplates.js';
import styles from "./PostNew.module.css";

const NewPost = () => {
    const { post, isSuccess, error } = usePost();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        styles: '',
        category: '',
        tags: '',
        thumbnail: '',
        description: ''
    });
    const [previewHtml, setPreviewHtml] = useState('');

    const useStylesTemplate = () => {
        setFormData({
            ...formData,
            styles: stylesTemplate
        })
    }

    const useContentTemplate = () => {
        setFormData({
            ...formData,
            content: contentTemplate
        })
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        handlePreview()
    };

    const handlePreview = () => {
        const codeBlocks = [];
        let contentWithInlineStyles = formData.content.replace(/style={{([^}]+)}}/g, (match, style) => {
            const inlineStyles = style.split(';').map(s => {
                const [key, value] = s.split(':').map(str => str.trim());
                return `${key}:${value}`;
            }).join(';');
            return `style=${inlineStyles}`;
        });
    
        // Extract code blocks and replace them with placeholders
        contentWithInlineStyles = contentWithInlineStyles.replace(/<pre.*?>(.*?)<\/pre>/gs, (match, code) => {
            const placeholder = `__CODE_BLOCK_${codeBlocks.length}__`;
            codeBlocks.push(code);
            return placeholder;
        });
    
        // Apply PrismJS highlighting to code blocks
        const highlightedCodeBlocks = codeBlocks.map(code => {
            return Prism.highlight(code, Prism.languages.swift, 'swift');
        });
    
        // Replace placeholders with highlighted code blocks
        let index = 0;
        contentWithInlineStyles = contentWithInlineStyles.replace(/__CODE_BLOCK_\d+__/g, () => {
            const highlightedCode = highlightedCodeBlocks[index];
            index++;
            return `<pre class="language-swift">${highlightedCode}</pre>`;
        });
    
        const htmlTemplate = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${formData.title}</title>
                <style>
                    ${formData.styles}
                </style>
                <link href="./prism.css" rel="stylesheet" />
            </head>
            <body>
                ${contentWithInlineStyles}
            
                <script src="./prism.js"></script>
            </body>
            </html>
        `;
        setPreviewHtml(htmlTemplate);
    };
    
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        await post(formData);
    };

    return (
        <div className="col mt-2 mx-5">
            <div className="col">
                <div className="container col-md-8">
                    <h2>Create New Tutorial</h2>
                    <form onSubmit={handleSubmit}>
                        {/* Form fields */}
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title (This goes in URL):</label>
                            <input type="text" id="title" name="title" className="form-control" value={formData.title} onChange={handleChange} required />
                        </div>
        
                        <div className="mb-3">
                            <label htmlFor="content" className="form-label">Content (HTML):</label>
                            <textarea id="content" name="content" className={`form-control ${styles.textArea}`} value={formData.content} onChange={handleChange} required />
                            <button type="button" className="btn btn-secondary mt-2" onClick={useContentTemplate}>Use template</button>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="styles" className="form-label">Styles (CSS):</label>
                            <textarea id="styles" name="styles" className={`form-control ${styles.textArea}`} value={formData.styles} onChange={handleChange} required />
                            <button type="button" className="btn btn-secondary mt-2" onClick={useStylesTemplate}>Apply Default Styles</button>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">Category:</label>
                            <select id="category" name="category" className="form-select" value={formData.category} onChange={handleChange} required>
                                <option value="">Select Category</option>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="tags" className="form-label">Tags:</label>
                            <input type="text" id="tags" name="tags" className="form-control" value={formData.tags} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="thumbnail" className="form-label">Thumbnail URL:</label>
                            <input type="text" id="thumbnail" name="thumbnail" className="form-control" value={formData.thumbnail} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description:</label>
                            <input type="text" id="description" name="description" className="form-control" value={formData.description} onChange={handleChange} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
                <div className="container border rounded col-md-10 py-2">
                    <h2>Preview</h2>
                    {isSuccess && (
                        <h5>Blog live at <a href={`/${formData.title.replace(/ /g, '-').toLowerCase()}`}>{`/${formData.title.replace(/ /g, '-').toLowerCase()}`}</a></h5>
                    )}
                    {previewHtml && (
                        <div className="mt-4">
                            <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
    
};

export default NewPost;


{/* 
                        <button type="button" className="btn btn-primary me-2" onClick={handlePreview}>Preview</button>

*/}