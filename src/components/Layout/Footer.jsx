import React from 'react'

const Footer = () => {
  return (
    <footer  >
      <div style={{ textAlign: 'center', padding: '10px 0' }}>
        <p>© {new Date().getFullYear()} MyWebsite. All rights reserved.</p>
        <p>
          <a href="/privacy-policy"  >Privacy Policy</a> |{' '}
          <a href="/terms"  >Terms of Service</a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
