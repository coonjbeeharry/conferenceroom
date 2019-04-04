<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Session\Session;
use AppBundle\Entity\Login;
use AppBundle\Entity\Signup;
use AppBundle\Entity\users;
use AppBundle\Entity\Booking;
use AppBundle\Entity\uploadFile; 
use Symfony\Component\Form\Extension\Core\Type\TextType; 
use Symfony\Component\Form\Extension\Core\Type\FileType;  
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;





class DefaultController extends Controller
{
  

 
  


    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {
        // replace this example code with whatever you need
        return $this->render('default/home.html.twig');
    }

 /**
     * @Route("/signup", name="signuppage")
     */
    public function signupAction(Request $request)
    {
        // replace this example code with whatever you need
        return $this->render('default/signup.html.twig');
    }

/**
     * @Route("/login", name="loginpage")
     */
    public function loginAction(Request $request)
    {
        // replace this example code with whatever you need
       // return $this->redirectToRoute('featurespage');
        return $this->render('default/login.html.twig');
    }

/**
     * @Route("/features", name="featurespage")
     */
    public function featureAction(Request $request)
    {
        // replace this example code with whatever you need
    
        return $this->render('default/features.html.twig');
    }


    /**
     * @Route("/reservdetail", name="reservepage")
     */
    public function reservdetailAction(Request $request)
    {
        // replace this example code with whatever you need
        return $this->render('default/reserdetail.html.twig');
    }


   /**
     * @Route("/Profile", name="profilepage")
     */
    public function ProfileAction(Request $request)
    {
    
        $uploadFile = new uploadFile; 
        $form = $this->createFormBuilder($uploadFile) 
           ->add('photo', FileType::class, array('label' => 'Photo')) 
           ->add('save', SubmitType::class, array('label' => 'Submit')) 
           ->getForm(); 
           $form->handleRequest($request); 

           if ($form->isSubmitted() && $form->isValid()) { 
        
            $file = $uploadFile->getPhoto(); 
            $fileName = md5(uniqid()).'.'.$file->guessExtension(); 
            $file->move('uploads/photos', $fileName); 
            $uploadFile->setPhoto($fileName); 
            
            $id='4';
            $entityManager = $this->getDoctrine()->getManager();
            $product = $entityManager->getRepository(users::class)->find($id);
            $product->setImagepath($fileName);
            $entityManager->flush();


          return $this->render('default/profile.html.twig', array( 
            'form' => $form->createView(), 
        )); 
           } 
         else { 
        
            return $this->render('default/profile.html.twig', array( 
               'form' => $form->createView(), 
           )); 
         } 
    }






     /**
     * @Route("/api/user", name="api_user")
     */
    public function LoginUser(Request $request)
    {    
        $login = new users;
        $login->setFirstname($request->request->get('username'));
        $login->setPassword($request->request->get('password'));

$entityManager = $this->getDoctrine()->getManager();
$usr = $entityManager->getRepository(users::class)->findByFirstname($login->getFirstname());
 
if (!$usr) {
  return new JsonResponse([
        'success_message' =>  'No user is found'
  ]);
}
else if (  ($usr[0]->getPassword())  == $login->getPassword()   ){
       $session = new Session();
   //   $session->start();
       $session->set('loginid', $usr[0]->getId());

       
        return $this->redirectToRoute('featurespage');
        
    }
else{
    return new JsonResponse([
              'success_message' => 'password error'
         ]);
}

     //     return $this->redirectToRoute('featurespage');
    //   return new JsonResponse([
    //       'success_message' =>  $login->getUsername()
    // ]);
        
    }
 /**
     * @Route("/api/signupuser", name="api_signuser")
     */
    public function SignUser(Request $request)
    {    
        $users =new users;
        
        $users->setFirstname($request->request->get('firstname'));
        $users->setLastname($request->request->get('lastname'));
        $users->setEmail($request->request->get('email'));
        $users->setPassword($request->request->get('password'));
        
        $em = $this->getDoctrine()->getManager();
        $em->persist($users);
        $em->flush();
        
     
      return new JsonResponse([
        'success_message' => $request->request->get('lastname')
   ]);     
    }

    /**
     * @Route("/api/booking", name="api_booking")
     */
    public function RoomBooking(Request $request)
    {    
        $Booking =new Booking;  
        $Booking->setUserid(1);
        $Booking->setRoomid($request->request->get('selectedRoom'));
       $Booking->setBookdate(\DateTime::createFromFormat('Y-m-d',$request->request->get('selectedDate')));
       $Booking->setStarttime(\DateTime::createFromFormat('H:i',$request->request->get('starttime')));
       $Booking->setEndtime(\DateTime::createFromFormat('H:i',$request->request->get('endtime')));
       $Booking->setEventname($request->request->get('eventname'));
       $Booking->setDescription($request->request->get('eventdetail'));
        $em = $this->getDoctrine()->getManager();
        $em->persist($Booking);
        $em->flush();        
    
        return new JsonResponse([
            'success_message' => $Booking->getEventname()
       ]);       
    }
  






}
