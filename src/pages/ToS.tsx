import React from 'react';
import Layout from '@/components/Layout';
import { FileText } from 'lucide-react';

const ToS: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <FileText className="inline-block h-16 w-16 text-sce-primary mb-4" />
          <h1 className="text-3xl font-bold mb-4">SCE Foundation Terms of Service (ToS)</h1>
          <p className="text-sce-secondary">
            This document outlines the terms and conditions for using the SCE Foundation website.
          </p>
        </div>
        
        <div className="prose prose-sm md:prose-base max-w-none">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using the SCE Foundation website ("the Service"), you agree to be bound 
            by these Terms of Service ("ToS"). If you do not agree to these terms, please do not use 
            the Service.
          </p>
          <p>
            The SCE Foundation website is a fictional creative project. All content on this website 
            is fictional and does not represent real events, organizations, or phenomena.
          </p>
          
          <h2>2. Description of Service</h2>
          <p>
            SCE Foundation provides a platform for creative writing and collaborative fiction within 
            the context of a fictional organization that secures, contains, and explores anomalous entities. 
            The Service allows users to:
          </p>
          <ul>
            <li>Read fictional reports and stories about anomalous objects and phenomena</li>
            <li>Create accounts to contribute content (subject to approval)</li>
            <li>Interact with other users through comments and discussions</li>
            <li>Participate in the collaborative development of the SCE Foundation universe</li>
          </ul>
          
          <h2>3. User Accounts</h2>
          <p>
            To access certain features of the Service, you must register for an account. When registering, 
            you agree to provide accurate, current, and complete information. You are responsible for 
            maintaining the confidentiality of your account credentials and for all activities that occur 
            under your account.
          </p>
          <p>
            The Service reserves the right to refuse registration, terminate accounts, remove or edit 
            content at its sole discretion.
          </p>
          
          <h2>4. User Content</h2>
          <p>
            By submitting content to the Service, you:
          </p>
          <ul>
            <li>
              Retain ownership rights to your content
            </li>
            <li>
              Grant SCE Foundation a worldwide, non-exclusive, royalty-free license to use, reproduce, 
              modify, adapt, publish, translate, and distribute your content in any medium and format
            </li>
            <li>
              Represent and warrant that you own or have the necessary rights to the content you submit, 
              and that your content does not violate the rights of any third party
            </li>
          </ul>
          <p>
            The Service may, but has no obligation to, review, screen, or edit user content for any reason, 
            including but not limited to ensuring compliance with these ToS and applicable laws.
          </p>
          
          <h2>5. Prohibited Content and Conduct</h2>
          <p>
            You agree not to use the Service to:
          </p>
          <ul>
            <li>Post content that is illegal, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable</li>
            <li>Impersonate any person or entity, or falsely state or otherwise misrepresent your affiliation with a person or entity</li>
            <li>Upload or transmit viruses or any other malicious code</li>
            <li>Interfere with or disrupt the Service or servers or networks connected to the Service</li>
            <li>Collect or store personal data about other users without their consent</li>
            <li>Promote or encourage illegal activity</li>
            <li>Infringe upon the intellectual property rights of others</li>
          </ul>
          
          <h2>6. Intellectual Property</h2>
          <p>
            The Service and its original content (excluding user-submitted content) are protected by 
            copyright, trademark, and other intellectual property laws. The SCE Foundation name, logo, 
            and branding are the exclusive property of the Service.
          </p>
          <p>
            You may not use, reproduce, distribute, or create derivative works based on the Service's 
            content without explicit permission from SCE Foundation.
          </p>
          
          <h2>7. Privacy Policy</h2>
          <p>
            Your use of the Service is also governed by our Privacy Policy, which is incorporated into 
            these ToS by reference.
          </p>
          
          <h2>8. Disclaimer of Warranties</h2>
          <p>
            The Service is provided on an "as is" and "as available" basis. SCE Foundation expressly 
            disclaims all warranties of any kind, whether express or implied, including but not limited 
            to the implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
          </p>
          <p>
            SCE Foundation makes no warranty that:
          </p>
          <ul>
            <li>The Service will meet your requirements</li>
            <li>The Service will be uninterrupted, timely, secure, or error-free</li>
            <li>The results obtained from using the Service will be accurate or reliable</li>
          </ul>
          
          <h2>9. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by applicable law, SCE Foundation shall not be liable for 
            any indirect, incidental, special, consequential, or punitive damages, including but not 
            limited to loss of profits, data, use, or goodwill, resulting from:
          </p>
          <ul>
            <li>Your access to or use of or inability to access or use the Service</li>
            <li>Any conduct or content of any third party on the Service</li>
            <li>Any content obtained from the Service</li>
            <li>Unauthorized access, use, or alteration of your transmissions or content</li>
          </ul>
          
          <h2>10. Modifications to the Service and ToS</h2>
          <p>
            SCE Foundation reserves the right to modify or discontinue, temporarily or permanently, the 
            Service (or any part thereof) with or without notice. We shall not be liable to you or any 
            third party for any modification, suspension, or discontinuance of the Service.
          </p>
          <p>
            SCE Foundation may revise these ToS from time to time. The most current version will always 
            be posted on the website. By continuing to access or use the Service after revisions become 
            effective, you agree to be bound by the revised terms.
          </p>
          
          <h2>11. Governing Law</h2>
          <p>
            These ToS shall be governed by and construed in accordance with the laws of the Russian 
            Federation, without regard to its conflict of law provisions.
          </p>
          
          <h2>12. Contact Information</h2>
          <p>
            If you have any questions about these ToS, please contact us through the website's 
            contact form.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default ToS;
