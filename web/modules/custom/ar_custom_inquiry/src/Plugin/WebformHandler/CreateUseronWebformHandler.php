<?php

namespace Drupal\ar_custom_inquiry\Plugin\WebformHandler;


use Drupal\Core\Form\FormStateInterface;
use Drupal\webform\Plugin\WebformHandlerBase;
use Drupal\webform\WebformSubmissionInterface;

/**
 * Form submission handler.
 *
 * @WebformHandler(
 *   id = "create_user_on_webform",
 *   label = @Translation("Create User"),
 *   category = @Translation("Notification"),
 *   description = @Translation("After submission, add submitter to drupal"),
 *   cardinality = \Drupal\webform\Plugin\WebformHandlerInterface::CARDINALITY_UNLIMITED,
 *   results = \Drupal\webform\Plugin\WebformHandlerInterface::RESULTS_PROCESSED,
 * )
 */
class CreateUserOnWebformHandler extends WebformHandlerBase {

  /**
    * The token manager.
    *
    * @var \Drupal\webform\WebformTranslationManagerInterface
    */
   protected $tokenManager;
 
  /**
    * {@inheritdoc}
    */
   public function __construct(array $configuration, $plugin_id, $plugin_definition, LoggerInterface $logger, WebformTokenManagerInterface $token_manager) {
     parent::__construct($configuration, $plugin_id, $plugin_definition, $logger);
     $this->tokenManager = $token_manager;
   }
 
  /**
    * {@inheritdoc}
    */
   public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
     return new static(
       $configuration,
       $plugin_id,
       $plugin_definition,
       $container->get('logger.factory')->get('webform.create_user'),
       $container->get('webform.token_manager')
     );
   }
 
   /**
    * {@inheritdoc}
    */
   public function getSummary() {
     $configuration = $this->getConfiguration();
     return [
       '#settings' => $configuration['settings'],
     ]   parent::getSummary();
   }
 
   /**
    * {@inheritdoc}
    */
   public function defaultConfiguration() {
     return [
       'user_email' => '',
       'user_username' => '',
       'user_password' => '',
       'user_new' => '',
     ];
   }

   /**
    * {@inheritdoc}
    */
   public function buildConfigurationForm(array $form, FormStateInterface $form_state) {
     $element_options = [];
     $elements = $this->webform->getElementsInitializedAndFlattened();
     foreach ($elements as $key => $element) {
       $title = (isset($element['#title'])) ? new FormattableMarkup('@title (@key)', ['@title' => $element['#title'], '@key' => $key]) : $key;
       if (isset($element['#type']) && in_array($element['#type'], ['email', 'hidden', 'value', 'select', 'radios', 'textfield', 'webform_email_multiple', 'webform_email_confirm', 'password'])) {
         // Note: Token must use the :raw webform mail elements.
         // For example a select menu's option value would be used to route an
         // email address.
         $element_options["[webform_submission:values:$key:raw]"] = $title;
       }
     }
 
     $elements_optgroup = (string) $this->t('Elements');
 
     $form['user_email'] = [
       '#type' => 'select',
       '#title' => $this->t('User email'),
       '#description' => $this->t('This is the field mapped to email, eg [webform_submission:value:raw:email]'),
       '#required' => TRUE,
       '#options' => [
         '' => '',
         $elements_optgroup => $element_options,
       ],
       '#default_value' => $this->configuration['user_email'],
     ];
 
     $form['user_username'] = [
       '#type' => 'select',
       '#title' => $this->t('Username'),
       '#description' => $this->t('This is the field mapped to username, eg [webform_submission:value:raw:username]'),
       '#required' => TRUE,
       '#options' => [
         '' => '',
         $elements_optgroup => $element_options,
       ],
       '#default_value' => $this->configuration['user_username'],
     ];
 
     $form['user_password'] = [
       '#type' => 'select',
       '#title' => $this->t('User password'),
       '#description' => $this->t('Leave blank for a random 10 digit alpha numeric.'),
       '#options' => [
         '' => '',
         $elements_optgroup => $element_options,
       ],
       '#default_value' => $this->configuration['user_password'],
     ];
 
     return $form;
   }

    
   /**
    * {@inheritdoc}
    */
   public function submitConfigurationForm(array &$form, FormStateInterface $form_state) {
     parent::submitConfigurationForm($form, $form_state);
     $values = $form_state->getValues();
     foreach ($this->configuration as $name => $value) {
       if (isset($values[$name])) {
         $this->configuration[$name] = $values[$name];
       }
     }
   }
 
   /**
    * {@inheritdoc}
    */
   public function postSave(WebformSubmissionInterface $webform_submission, $update = TRUE) {
     $operation = ($update) ? 'update' : 'insert';
     $user_data = $this->getUser($webform_submission);
     $this->createUser($operation, $user_data);
   }
 
   /**
    * Create a user from submission data.
    *
    * @param string $operation
    *   The type of webform submission operation to be posted. Can be 'insert',
    *   'update', or 'delete'.
    * @param array $user_data
    *   key value pair for user fields
    */
   protected function createUser($operation, array $user_data) {
     if ($operation == 'insert') {
       $user = \Drupal\user\Entity\User::create();
       //Mandatory settings
       $password = !empty($user_data['user_password']) ? $user_data['user_password'] : user_password();
       $user->setPassword($password);
       $user->enforceIsNew();
       $user->setEmail($user_data['user_email']);
       $user->setUsername($user_data['user_username']);
       //Optional settings
       $user->activate();
       //Save user
       $res = $user->save();
     }
   }
 
   public function getUser(WebformSubmissionInterface $webform_submission) {
     $user_data = $this->configuration;
 
     // Replace 'default' values and [tokens] with configuration default values.
     foreach ($user_data as $key => $value) {
       if (is_string($user_data[$key])) {
         $user_data[$key] = $this->tokenManager->replace($user_data[$key], $webform_submission);
       }
     }
 
     return $user_data;
   }
}