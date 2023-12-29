
export default function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-12 sm:py-18 lg:px-8">
        <p className="text-center text-xs leading-5 text-gray-700">
          &copy; { new Date().getFullYear() } Our Demo. All rights reserved.
        </p>
      </div>
    </footer>
  )
}