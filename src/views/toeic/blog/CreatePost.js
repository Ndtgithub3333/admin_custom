import React, { useState, useRef, useCallback } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CButton,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
} from '@coreui/react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import 'react-quill/dist/quill.bubble.css'
import DOMPurify from 'dompurify'
import './quill-custom.css'

const CreatePost = () => {
  const [activeTab, setActiveTab] = useState(1)
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: '',
    imagePreview: null,
    author: '',
    publishDate: '',
    status: 'Draft',
    // likes: 0
  })
  const quillRef = useRef(null)

  const handleImageUpload = useCallback(() => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()

    input.onchange = async () => {
      const file = input.files[0]
      if (file) {
        try {
          const reader = new FileReader()
          reader.onloadend = () => {
            const editor = quillRef.current?.getEditor()
            if (editor) {
              const range = editor.getSelection() || { index: editor.getLength(), length: 0 }
              editor.insertEmbed(range.index, 'image', reader.result)
              editor.setSelection(range.index + 1, 0)
            }
          }
          reader.readAsDataURL(file)
        } catch (error) {
          console.error('Error uploading image:', error)
        }
      }
    }
  }, [])

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleEditorChange = (content) => {
    setFormData((prev) => ({
      ...prev,
      content: content,
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        handleInputChange('imagePreview', reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ color: [] }, { background: [] }],
        [{ font: [] }, { size: ['small', false, 'large', 'huge'] }],
        [{ align: [] }, { indent: '-1' }, { indent: '+1' }],
        [{ list: 'ordered' }, { list: 'bullet' }, { script: 'sub' }, { script: 'super' }],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video'],
        ['clean'],
      ],
      handlers: {
        image: handleImageUpload,
      },
    },
    clipboard: {
      matchVisual: false,
    },
  }

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'color',
    'background',
    'font',
    'size',
    'align',
    'indent',
    'list',
    'bullet',
    'script',
    'blockquote',
    'code-block',
    'link',
    'image',
    'video',
  ]


  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4 blog-card">
          <CCardHeader>
            <strong>Create New Post</strong>
          </CCardHeader>
          <CCardBody>
            <CNav variant="tabs" role="tablist" className="custom-tabs">
              <CNavItem>
                <CNavLink active={activeTab === 1} onClick={() => setActiveTab(1)}>
                  Editor
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink active={activeTab === 2} onClick={() => setActiveTab(2)}>
                  Preview
                </CNavLink>
              </CNavItem>
            </CNav>

            <CTabContent className="p-4">
              <CTabPane visible={activeTab === 1} role="tabpanel">
                <CForm>
                  <div className="mb-3">
                    <CFormLabel>Title</CFormLabel>
                    <CFormInput
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <CFormLabel>Category</CFormLabel>
                    <CFormSelect
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                    >
                      <option value="">Select Category</option>
                      <option value="Study Tips">Study Tips</option>
                      <option value="Listening">Listening</option>
                      <option value="Reading">Reading</option>
                      <option value="Grammar">Grammar</option>
                    </CFormSelect>
                  </div>

                  <div className="mb-3">
                    <CFormLabel>Author</CFormLabel>
                    <CFormInput
                      value={formData.author}
                      onChange={(e) => handleInputChange('author', e.target.value)}
                      placeholder="Enter author name"
                    />
                  </div>

                  <div className="mb-3">
                    <CFormLabel>Publish Date</CFormLabel>
                    <CFormInput
                      type="date"
                      value={formData.publishDate}
                      onChange={(e) => handleInputChange('publishDate', e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <CFormLabel>Featured Image</CFormLabel>
                    <div className="featured-image-container">
                      <CFormInput
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mb-3"
                      />
                      {formData.imagePreview && (
                        <div className="image-preview-wrapper mb-3">
                          <div className="image-preview-container">
                            <img
                              src={formData.imagePreview}
                              alt="Preview"
                              className="featured-image-preview"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mb-3">
                    <CFormLabel>Content</CFormLabel>
                    <div className="editor-container" style={{ position: 'relative', paddingBottom: '60px' }}>
                      <ReactQuill
                        ref={quillRef}
                        theme="snow"
                        value={formData.content}
                        onChange={handleEditorChange}
                        modules={modules}
                        formats={formats}
                        style={{
                          height: '400px',
                          marginBottom: '50px',
                        }}
                        placeholder="Write something amazing..."
                        preserveWhitespace={true}
                      />
                    </div>
                  </div>

                  <div 
                    className="d-flex gap-2 justify-content-end mt-6"
                    style={{ 
                      position: 'sticky',
                      bottom: '20px',
                      padding: '10px 0',
                      zIndex: 1000,
                    }}
                  >
                    <CButton color="secondary" variant="outline">
                      Save as Draft
                    </CButton>
                    <CButton color="primary">Publish Post</CButton>
                  </div>
                </CForm>
              </CTabPane>

              <CTabPane visible={activeTab === 2} role="tabpanel">
                <div className="blog-preview animate-fade-in">
                  <h1 className="blog-title">{formData.title}</h1>

                  <div className="blog-meta mb-4">
                    {formData.author && (
                      <span className="blog-author">
                        <i className="fas fa-user me-2"></i>
                        {formData.author}
                      </span>
                    )}
                    {formData.publishDate && (
                      <span className="blog-date ms-3">
                        <i className="fas fa-calendar-alt me-2"></i>
                        {new Date(formData.publishDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    )}
                  </div>

                  {formData.category && (
                    <div className="mb-3">
                      <span
                        className="badge bg-info"
                        style={{
                          padding: '8px 16px',
                          fontSize: '0.9rem',
                          borderRadius: '20px',
                        }}
                      >
                        {formData.category}
                      </span>
                    </div>
                  )}

                  {formData.imagePreview && (
                    <div
                      className="mb-4"
                      style={{
                        borderRadius: '8px',
                        overflow: 'hidden',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      }}
                    >
                      <img
                        src={formData.imagePreview}
                        alt="Featured"
                        style={{
                          maxWidth: '100%',
                          height: 'auto',
                          display: 'block',
                        }}
                      />
                    </div>
                  )}

                  <div
                    className="ql-editor blog-content"
                    style={{
                      fontSize: '1.1rem',
                      lineHeight: '1.8',
                      color: '#2c3e50',
                    }}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(formData.content),
                    }}
                  />
                </div>
              </CTabPane>
            </CTabContent>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}


export default CreatePost
