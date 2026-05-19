export default function FAQ() {
  const faqs = [
    {
      q: "Kenapa harus tanya stok dulu?",
      a: "Karena stok akun bergerak cepat setiap harinya. Memastikan ketersediaan stok akan mempercepat proses order Anda tanpa harus menunggu lama."
    },
    {
      q: "Bagaimana cara memesan?",
      a: "Cukup klik tombol keranjang WhatsApp pada akun yang Anda inginkan, Anda akan otomatis diarahkan ke chat admin WhatsApp kami."
    },
    {
      q: "Apakah ada garansi yang diberikan?",
      a: "Tentu saja! Semua produk yang kami jual memiliki garansi penuh sesuai dengan masa aktif akun yang Anda pesan dari kami."
    }
  ];

  return (
    <section className="mt-28 mb-10 max-w-3xl mx-auto px-4">
      <div className="text-center mb-10">
        <h2 className="font-display font-bold text-3xl mb-3">Pertanyaan Umum (FAQ)</h2>
        <p className="text-gray-500 text-sm">Beberapa hal yang sering ditanyakan jika Anda baru pertama kali berbelanja.</p>
      </div>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm transition-all hover:border-gray-200">
            <h4 className="font-bold font-display text-gray-900 text-lg mb-2">{faq.q}</h4>
            <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
