"use client";

import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import Contact from '@/components/Contact';
const contact = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      name: e.currentTarget.username.value,
      email: e.currentTarget.email.value,
      contactNumber: e.currentTarget.contactNumber.value,
      purpose: e.currentTarget.purpose.value,
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contactForm`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res);
    if (res.ok) {
      alert("Message Sent Successfully");
    } else {
      alert("Message Failed to Send");
    }
  };

  return (
    <div className="bg-amber-50 min-h-screen">
      <Header />
      <Navbar />
      <div className="w-full bg-blue-900 py-10 flex justify-center items-center">
        <h1 className="text-3xl lg:text-5xl font-bold text-center text-white">
          Contact Us
        </h1>
      </div>
      <section className="mx-auto my-20 w-4/5 bg-center bg-no-repeat">
        <div className="grid grid-cols-1 md:grid-cols-2 ">
          <div className="flex pl-10 flex-col bg-white py-10 px-6 text-black">
            <h3 className="text-black text-2xl font-bold underline">
              Contact Details
            </h3>
            <ul className="text-black pt-6">
              <li className="my-5">
                <i className="mr-2 fas fa-map-marker-alt text-black"></i>{" "}
                CHARUSAT Campus, Off Nadiad-Petlad Highway, Changa, Anand
              </li>
              <li className="my-5">
                <i className="mr-2 fas fa-phone-alt text-black"></i>{" "}
                02697-265401
              </li>
              <li className="my-5">
                <i className="mr-2 fas fa-envelope text-black"></i>{" "}
                civf@charusat.ac.in
              </li>
              <li className="my-5">
                <i className="mr-2 fab fa-whatsapp text-black"></i> 7383491911
              </li>
              {/*  */}
              <div className="flex mt-4 space-x-6 sm:mt-0 text-black">
                {/* LinkedIn */}
                <a href="https://www.linkedin.com/company/charusat-innovative-ventures-foundation" target="_blank" rel="noopener noreferrer" className="text-black hover:text-blue-700">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/>
                  </svg>
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a
                  href="https://wa.me/message/TDBNDOFJPC5AE1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-green-600"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 17 17"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">WhatsApp</span>
                </a>
              </div>
            </ul>
          </div>

          <div className="w-full h-full overflow-hidden mx-auto relative object-cover transition-all duration-300 cursor-pointer filter">
            <p>
              <iframe
                src="https://maps.google.com/maps?hl=en&q=charusat&t=&z=13&ie=UTF8&iwloc=B&output=embed"
                width="620"
                height="360"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="mx-auto overflow-hidden"
              ></iframe>
            </p>
            <figcaption className="absolute bottom-6 px-4 text-lg text-white bg-black/40">
              <p>Charotar University of Science and Technology</p>
            </figcaption>
          </div>
        </div>
      </section>

      {/* <div className="w-full flex items-center mb-5">
        <a
          href="https://forms.gle/ohniYP9zUsbkUQhh8"
          target={"_blank"}
          className="px-5 m-auto py-3 font-bold bg-rose-500 transition-all rounded-full text-white hover:bg-rose-700"
        >
          Let's Connect
        </a>
      </div> */}
      <div className="w-full md:w-2/3 my-10 lg:w-1/2 xl:w-5/12 px-4 mx-auto">
        <div className="bg-white/50 border-2 text-black relative rounded-lg p-8 sm:p-12 shadow-2xl">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <input
                name="username"
                type="text"
                placeholder="Your Name"
                className="bg-white/60 placeholder:text-black/60 w-full rounded py-3 px-[14px] text-black text-base border border-black outline-black focus:ring-black focus:border-black"
              />
            </div>
            <div className="mb-6">
              <input
                name="email"
                type="email"
                placeholder="Your Email"
                className="bg-white/60 placeholder:text-black/60 w-full rounded py-3 px-[14px] text-black text-base border border-black outline-black focus:ring-black focus:border-black"
              />
            </div>
            <div className="mb-6">
              <input
                name="contactNumber"
                type="text"
                placeholder="Your Phone"
                className="bg-white/60 placeholder:text-black/60 w-full rounded py-3 px-[14px] text-black text-base border border-black outline-black focus:ring-black focus:border-black"
              />
            </div>
            <div className="mb-6">
              <textarea
                name="purpose"
                rows={6}
                placeholder="Your Message"
                className="bg-white/60 placeholder:text-black/60 w-full rounded py-3 px-[14px] text-black text-base border border-black outline-black focus:ring-black focus:border-black"
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="w-full text-white bg-rose-600 rounded border border-rose-700 p-3 transition hover:bg-opacity-90"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
      <Contact />
    </div>
  );
};

export default contact;
