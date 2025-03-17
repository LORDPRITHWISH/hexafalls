
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Info, Sparkles, RotateCcw } from 'lucide-react';

const BillCipherExplorer = () => {
  return (
    <div className="min-h-screen bg-gravity-dark">
      <Navbar />
      <main className="page-transition pt-20 pb-16">
        <section className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-mystery text-gravity-gold text-center mb-4 gold-glow">
              Bill Cipher Explorer
            </h1>
            <p className="text-white/80 text-center mb-8 max-w-xl mx-auto">
              Interact with the mysterious Bill Cipher, the dream demon from Gravity Falls.
              Rotate, zoom, and click to discover Bill's secrets!
            </p>
            
            <div className="glass p-4 md:p-8 rounded-xl mb-8">
              <BillCipher3D className="h-[70vh]" />
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <Dialog>
                <DialogTrigger className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gravity-purple/20 text-white border border-gravity-purple/30 hover:bg-gravity-purple/30 transition-colors">
                  <Info size={18} />
                  <span>About Bill Cipher</span>
                </DialogTrigger>
                <DialogContent className="bg-gravity-darker text-white border-gravity-purple">
                  <DialogHeader>
                    <DialogTitle className="text-gravity-gold text-2xl font-mystery">Bill Cipher</DialogTitle>
                    <DialogDescription className="text-white/70">
                      A powerful dream demon from Gravity Falls
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 text-white/80 mt-4">
                    <p>
                      Bill Cipher is a triangular dream demon formerly existent only in the mindscape who wished 
                      to gain access to the real world. He had been running amok in Gravity Falls, Oregon since 
                      being summoned by Stanford Pines over thirty years ago.
                    </p>
                    <p>
                      Bill is a triangle with a single large eye rimmed with four short lashes on the top and bottom. 
                      He has a thin bowtie-like shape just below his eye, and wears a tall, thin top hat that floats 
                      just above his head. His body is two-dimensional and yellow in color.
                    </p>
                    <p className="italic text-gravity-gold text-center">
                      "Remember: reality is an illusion, the universe is a hologram, buy gold, BYE!"
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
              
              <a
                href="/"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gravity-gold/20 text-white border border-gravity-gold/30 hover:bg-gravity-gold/30 transition-colors"
              >
                <RotateCcw size={18} />
                <span>Back to Home</span>
              </a>
              
              <Dialog>
                <DialogTrigger className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gravity-red/20 text-white border border-gravity-red/30 hover:bg-gravity-red/30 transition-colors">
                  <Sparkles size={18} />
                  <span>Cipher Secrets</span>
                </DialogTrigger>
                <DialogContent className="bg-gravity-darker text-white border-gravity-red/30">
                  <DialogHeader>
                    <DialogTitle className="text-gravity-gold text-2xl font-mystery">Hidden Messages</DialogTitle>
                    <DialogDescription className="text-white/70">
                      Look for the clues, decode the mystery
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <p className="cipher-text text-center py-4 journal-paper rounded-lg">
                      ZHOFRPH WR JUDYLWBKDFN
                    </p>
                    <p className="text-white/80">
                      Bill Cipher often speaks in codes and riddles. This message is encrypted with the Caesar cipher,
                      a simple substitution cipher where each letter is shifted a certain number of places in the alphabet.
                    </p>
                    <p className="text-white/80">
                      Hint: Shift three letters back to decode the message. What secret does it reveal?
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BillCipherExplorer;
