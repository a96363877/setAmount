import Link from 'next/link';
export function Footer() {
  return (
    <footer className="bg-[#006a8f] text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src="/logo-footer.png"
            alt="Elaf Charity Logo"
            width={60}
            height={60}
            className="w-16"
          />
        </div>

        {/* Contact Info */}
        <div className="text-center mb-8">
          <h3 className="text-amber-400 text-xl mb-4">معلومات عنا</h3>
          <div className="mb-2 text-lg">96598509778</div>
          <div className="mb-4">info@elaafkw.com</div>
          <div className="flex justify-center gap-4 text-sm">
            <Link href="#" className="hover:text-amber-400">
              حساب المشاريع
            </Link>
            <Link href="#" className="hover:text-amber-400">
              طريقة التبرع
            </Link>
            <Link href="#" className="hover:text-amber-400">
              خدمة العملاء
            </Link>
            <Link href="#" className="hover:text-amber-400">
              حساب استقطاع بنكي
            </Link>
            <Link href="#" className="hover:text-amber-400">
              حساب مشترك
            </Link>
          </div>
        </div>

        {/* Quote Section */}
        <div className="text-center mb-8">
          <h3 className="text-amber-400 text-xl mb-4">سارعوا للخيرات</h3>
          <p className="mb-2">قال رسول الله صلى الله عليه وسلم</p>
          <p className="mb-4 max-w-md mx-auto">
            لن يتصدق المرء في حياته بدرهم خير له من أن يتصدق بمائة عند موته
          </p>
          <p>صدق رسول الله صلى الله عليه وسلم</p>
        </div>

        {/* Social Media */}
        <div className="flex justify-center gap-4 mb-8">
          <Link href="#" className="hover:text-amber-400">
            <span className="sr-only">Facebook</span>
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
              <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24h21.35c.731 0 1.325-.593 1.325-1.325V1.325C24 .593 23.407 0 22.675 0zm-6.033 9.84v.43h-1.497c-.55 0-.66.262-.66.648v1.112h2.1l-.209 2.12h-1.89v5.93h-2.1v-5.93H10.5v-2.12h1.886V10.81c0-1.867.522-3.015 2.732-3.015h1.524v2.046z" />
            </svg>
          </Link>
          <Link href="#" className="hover:text-amber-400">
            <span className="sr-only">Twitter</span>
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
              <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
            </svg>
          </Link>
          <Link href="#" className="hover:text-amber-400">
            <span className="sr-only">YouTube</span>
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </Link>
          <Link href="#" className="hover:text-amber-400">
            <span className="sr-only">Instagram</span>
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
              <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
            </svg>
          </Link>
        </div>

        {/* Bottom Logo */}
        <div className="flex justify-center mb-4">
          <img
            src="/logo-footer.png"
            alt="Elaf Charity Logo"
            width={60}
            height={60}
            className="w-16"
          />
        </div>

        {/* Copyright */}
        <div className="text-center text-sm mb-20">
          <p>جميع الحقوق محفوظة © جمعية إيلاف الخيرية في دولة قطر 2021</p>
        </div>
      </div>
    </footer>
  );
}
