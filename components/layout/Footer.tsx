import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Mahsa Khakpour. All rights reserved.
          </div>
          
          <div className="flex gap-4">
            <a
              href="https://github.com/mahsakhakpour"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://linkedin.com/in/mahsa-khakpour"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=mahsa54@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Email"
              className="text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400"
            >
              <FaEnvelope size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}