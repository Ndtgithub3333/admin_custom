import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CBadge,
  CInputGroup,
  CFormInput,
  CFormSelect,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash, cilPlus, cilSearch } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import DOMPurify from 'dompurify'

const Posts = () => {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Top 10 TOEIC Tips for Beginners',
      category: 'Study Tips',
      author: 'John Doe',
      status: 'Published',
      content: '<h2>Getting Started</h2><p>Here are some tips...</p>',
      views: 1234,
      comments: 23,
      // likes: 156,
      publishDate: '2024-03-15',
    },
    {
      id: 2,
      title: 'TOEIC Listening Practice Guide',
      category: 'Listening',
      author: 'Jane Smith',
      status: 'Draft',
      content: '<h2>Listening Skills</h2><p>Improve your listening with...</p>',
      views: 0,
      comments: 0,
      // likes: 0,
      publishDate: '-',
    },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)

  const handleCreateNew = () => {
    navigate('/toeic/blog/create')
  }

  const handleEdit = (postId) => {
    navigate(`/toeic/blog/edit/${postId}`)
  }

  const handleDelete = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(posts.filter(post => post.id !== postId))
    }
  }

  const handlePreview = (post) => {
    setSelectedPost(post)
    setShowPreviewModal(true)
  }

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !categoryFilter || post.category === categoryFilter
    const matchesStatus = !statusFilter || post.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <div className="d-flex justify-content-between align-items-center">
              <strong>Blog Posts</strong>
              <CButton 
                color="primary" 
                className="d-flex align-items-center gap-2"
                onClick={handleCreateNew}
              >
                <CIcon icon={cilPlus} /> Create New Post
              </CButton>
            </div>
          </CCardHeader>
          <CCardBody>
            {/* Filters */}
            <div className="mb-4 d-flex gap-3 flex-wrap">
              <CInputGroup style={{ maxWidth: '300px' }}>
                <CFormInput 
                  placeholder="Search posts..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </CInputGroup>

              <CFormSelect 
                style={{ maxWidth: '200px' }}
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="Study Tips">Study Tips</option>
                <option value="Listening">Listening</option>
                <option value="Reading">Reading</option>
                <option value="Grammar">Grammar</option>
              </CFormSelect>

              <CFormSelect
                style={{ maxWidth: '150px' }}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </CFormSelect>
            </div>

            {/* Posts Table */}
            <CTable hover responsive className="align-middle">
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Title</CTableHeaderCell>
                  <CTableHeaderCell>Category</CTableHeaderCell>
                  <CTableHeaderCell>Author</CTableHeaderCell>
                  <CTableHeaderCell>Status</CTableHeaderCell>
                  <CTableHeaderCell>Views</CTableHeaderCell>
                  <CTableHeaderCell>Comments</CTableHeaderCell>
                  {/* <CTableHeaderCell>Likes</CTableHeaderCell> */}
                  <CTableHeaderCell>Publish Date</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {filteredPosts.map((post) => (
                  <CTableRow key={post.id}>
                    <CTableDataCell>{post.title}</CTableDataCell>
                    <CTableDataCell>
                      <CBadge color="info" className="px-2 py-1">
                        {post.category}
                      </CBadge>
                    </CTableDataCell>
                    <CTableDataCell>{post.author}</CTableDataCell>
                    <CTableDataCell>
                      <CBadge 
                        color={post.status === 'Published' ? 'success' : 'warning'}
                        className="px-2 py-1"
                      >
                        {post.status}
                      </CBadge>
                    </CTableDataCell>
                    <CTableDataCell>{post.views.toLocaleString()}</CTableDataCell>
                    <CTableDataCell>{post.comments}</CTableDataCell>
                    {/* <CTableDataCell>{post.likes}</CTableDataCell> */}
                    <CTableDataCell>{post.publishDate}</CTableDataCell>
                    <CTableDataCell>
                      <div className="d-flex gap-2">
                        <CButton 
                          color="info" 
                          variant="ghost"
                          size="sm"
                          onClick={() => handlePreview(post)}
                        >
                          <CIcon icon={cilSearch} />
                        </CButton>
                        <CButton
                          color="primary"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(post.id)}
                        >
                          <CIcon icon={cilPencil} />
                        </CButton>
                        <CButton
                          color="danger"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(post.id)}
                        >
                          <CIcon icon={cilTrash} />
                        </CButton>
                      </div>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>

            {/* Preview Modal */}
            <CModal 
              visible={showPreviewModal} 
              onClose={() => setShowPreviewModal(false)}
              size="lg"
            >
              <CModalHeader closeButton>
                <h5 className="mb-0">Preview Post</h5>
              </CModalHeader>
              <CModalBody>
                {selectedPost && (
                  <div className="blog-preview">
                    <h1 className="blog-title">{selectedPost.title}</h1>
                    
                    <div className="blog-meta mb-4">
                      <span className="blog-author">
                        <i className="fas fa-user me-2"></i>
                        {selectedPost.author}
                      </span>
                      <span className="blog-date ms-3">
                        <i className="fas fa-calendar-alt me-2"></i>
                        {selectedPost.publishDate}
                      </span>
                      {/* <span className="blog-likes ms-3">
                        <i className="fas fa-heart me-2"></i>
                        {selectedPost.likes.toLocaleString()} likes
                      </span> */}
                    </div>

                    <div className="mb-3">
                      <CBadge color="info" className="px-3 py-2">
                        {selectedPost.category}
                      </CBadge>
                    </div>

                    <div
                      className="ql-editor blog-content"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(selectedPost.content)
                      }}
                    />
                  </div>
                )}
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={() => setShowPreviewModal(false)}>
                  Close
                </CButton>
              </CModalFooter>
            </CModal>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Posts
